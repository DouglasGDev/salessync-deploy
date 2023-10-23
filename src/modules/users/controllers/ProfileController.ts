import { Request, Response } from "express";
import ShowProfileService from "../services/ShowProfileService";
import UpdateProfileService from "../services/UpdateProfileService";
import { instanceToInstance } from "class-transformer";

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response>{
    const showProfile = new ShowProfileService // aqui chama a classe de serviço de listagem de usuários
    const user_id = request.user.id;

    const user = await showProfile.execute({user_id}); // aqui espera a consulta

    return response.json(instanceToInstance(user));// aqui retorna no json a consulta

  }

  public async update(request: Request, response: Response): Promise<Response>{
    const user_id = request.user.id;

    const {name, email, password, old_password} = request.body; // aqui armazena as variaveis os valores que vem do body


    const updateProfile = new UpdateProfileService(); // aqui chama o serviço de criar usuário

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password
    }); // aqui espera a atualização do usuário

     return response.json(instanceToInstance(user));// aqui envia resposta no formato json
  }
}
