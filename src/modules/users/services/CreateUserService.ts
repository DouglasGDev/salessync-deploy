import { getCustomRepository } from "typeorm";
import  UsersRepository  from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import { hash } from "bcryptjs";

// o serviço tem uma única responsabilidade de apenas criar o usuário
// a regra de aplicação é não permitir cadastrar o mesmo email
interface IRequest {
   name: string;
   email: string;
   password: string;
}
class CreateUserService { // reponsável por criar conta de usuários
    public async execute({name, email, password}: IRequest): Promise<User> {
      const usersRepository = getCustomRepository(UsersRepository);// aqui pega o repositorio customizado, onde fica os métodos
      const emailExists = await usersRepository.findByEmail(email);

      if(emailExists) {
        throw new AppError('Esse endereço de email ja está em uso.'); // aqui verifica se o email ja existe
      }

      const hashedPassword = await hash(password, 8); //aqui ele criptografa a senha do password em 8 passos

      const user = usersRepository.create({ // aqui prepara(só monta o objeto, não precisa do await) o objeto para ser enviado para o db
          name,
          email,
          password: hashedPassword,
      });

      await usersRepository.save(user);// aqui salva o que foi preparado e envia para o db

      return user;
    }
}

export default CreateUserService;
