import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import { instanceToInstance } from 'class-transformer'
// controlador exclusivo para atualizar foto de avatar.
export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    const user = await updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file?.filename as string,// aqui esta dizendo que recebe string, o nome da foto de avatar
    });
    return response.json(instanceToInstance(user));
  }
}
