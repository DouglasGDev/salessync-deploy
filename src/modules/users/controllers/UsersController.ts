import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ListUserService from "../services/ListUserService";
import { instanceToInstance } from 'class-transformer';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response>{
    const listUser = new ListUserService(); // aqui chama a classe de serviço de listagem de usuários


    const users = await listUser.execute(); // aqui espera a consulta

    return response.json(instanceToInstance(users));// aqui retorna no json a consulta

  }

  public async create(request: Request, response: Response): Promise<Response>{
    const {name, email, password} = request.body; // aqui armazena as variaveis os valores que vem do body

    const createUser = new CreateUserService(); // aqui chama o serviço de criar usuário

    const user = await createUser.execute({
      name,
      email,
      password
    }); // aqui espera a criação do usuário

     return response.json(instanceToInstance(user));// aqui envia resposta no formato json
  }
}
