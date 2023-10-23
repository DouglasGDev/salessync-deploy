import { Request, Response } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';
import { instanceToInstance } from 'class-transformer';

// controller de criar sessão
export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {email, password} = request.body; // aqui ele pega o email e senha do corpo da requisição

    const createSession = new CreateSessionsService(); // aqui chama o serviço de criar sessão e fica armazenado na variável

    const user  = await createSession.execute({ // armazena a execução no user
      email,
      password
    });

    return response.json(instanceToInstance(user)); // aqui retorna a sessão user no json
  }
}
