import { getCustomRepository } from "typeorm";
import  UsersRepository  from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import { compare, hash } from 'bcryptjs';
// o serviço tem uma única responsabilidade de apenas listar o usuario

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

class UpdateProfileService {
    public async execute({user_id, name, email, password, old_password}:IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);


        const user = await usersRepository.findById(user_id);// aqui ele vai receber o id fazer a busca do usuario no db

        if(!user){
          throw new AppError('Usuário não encontrado.');// excessão
        }

        const userUpdateEmail = await usersRepository.findByEmail(email);

        if(userUpdateEmail && userUpdateEmail.id !== user_id){
          throw new AppError('Ja tem um usuário  com este email.'); // aqui garante que o email fornecido não seja usado de outro usuário
        }

        if(password && !old_password) {
          throw new AppError('Senha antiga é requerida.');// aqui requere o preenchimento da senha antiga.
        }

        if(password && old_password) {
          const checkOldPassword = await compare(old_password, user.password); // aqui está comparando a senha não criptografada com a do db para ver se está correto para fazer a troca de senha

          if(!checkOldPassword){
            throw new AppError('Senha antiga não confere.');
          }

          user.password = await hash(password, 8);
        }

        user.name = name;
        user.email = email;

        await usersRepository.save(user); // aqui slva a senha atualizada caso passou por todas verificações

        return user; // e aqui ele retorna o usuário
    }
}

export default UpdateProfileService;
