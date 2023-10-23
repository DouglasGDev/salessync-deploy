import { getCustomRepository } from "typeorm";
import  UsersRepository  from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import { compare } from "bcryptjs";
import { Secret, sign } from "jsonwebtoken";
import authConfig from "@config/auth";

// o serviço tem uma única responsabilidade de apenas criar o usuário
// a regra de aplicação é não permitir cadastrar o mesmo email
interface IRequest {
   email: string;
   password: string;
}
interface IResponse {
  user: User;
  token: string;
}

class CreateSessionsService { // reponsável por criar sessão conta de usuários
    public async execute({email, password}: IRequest): Promise<IResponse> {
      const usersRepository = getCustomRepository(UsersRepository);// aqui pega o repositorio customizado, onde fica os métodos
      const user = await usersRepository.findByEmail(email);

      if(!user) {
        throw new AppError('Combinação incorreta de email/senha.', 401); // aqui verifica se tem usuario com o email cadastrado
      }

      const passwordConfirmed = await compare(password, user.password); //aqui ele compara as senhas(a criptografada do db com a fornecida) e armazena o resultado

      if(!passwordConfirmed) {
        throw new AppError('Combinação incorreta de email/senha.', 401); // aqui verifica se tem usuario com o email cadastrado
      }

      const token = sign({}, authConfig.jwt.secret as Secret, { // aqui cria o token e puxa do authConfig
        subject: user.id, // vai entregar o id de usuário no token
        expiresIn: authConfig.jwt.expiresIn, // expira a cada 24h
      });

      return { // aqui retorna o user e o token
        user,
        token
      };
    }
}

export default CreateSessionsService;
