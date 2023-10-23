import { getCustomRepository } from "typeorm";
import  UsersRepository  from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
// o serviço tem uma única responsabilidade de apenas listar o usuario

class ListUserService {
    public async execute(): Promise<User[]> {
        const usersRepository = getCustomRepository(UsersRepository);


        const users = usersRepository.find();// aqui ele vai receber o nome fazer a busca do usuario no db

        return users; // e aqui ele retorna os usuários
    }
}

export default ListUserService;
