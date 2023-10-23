import { getCustomRepository } from "typeorm";
import {isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs'
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import AppError from "@shared/errors/AppError";


// o serviço tem uma única responsabilidade de apenas enviar a recuperação de senha por e-mail do usuário
interface IRequest {
   token: string;
   password: string;
}
class ResetPasswordService { // reponsável por enviar o email de recuperação de senha
    public async execute({ token, password }: IRequest): Promise<void> {
      const usersRepository = getCustomRepository(UsersRepository);// aqui pega o repositorio customizado, onde fica os métodos
      const userTokensRepository = getCustomRepository(UserTokensRepository);// repositorio de token dos usuários

      const userToken = await userTokensRepository.findByToken(token);

      if(!userToken){
        throw new AppError('Token de usuário não existe.'); // aqui verifica se o token disponibilizado foi encontrado e se não foi da esse erro.
      }

      const user = await usersRepository.findById(userToken.user_id);

      if(!user){
        throw new AppError('Usuário não existe.'); // aqui verifica se o id de usuário disponibilizado foi encontrado e se não foi da esse erro.
      }

      const tokenCreatedAt = userToken.created_at; // aqui verifica quando foi criado o token
      const compareDate = addHours(tokenCreatedAt, 2); // aqui fala que horario que foi criado e conta 2h

      if(isAfter(Date.now(), compareDate)) {
        throw new AppError('Token expirado.');
      }

      user.password = await hash(password, 8);

      await usersRepository.save(user);
    }
}

export default ResetPasswordService;
