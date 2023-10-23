import { getCustomRepository } from "typeorm";
import  UsersRepository  from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import DiskStorageProvider from "@shared/providers/StorageProvider/DiskStorageProvider";
import uploadConfig from '@config/upload';
import S3StorageProvider from "@shared/providers/StorageProvider/S3StorageProvider";
// o serviço tem uma única responsabilidade de apenas criar o usuário
// a regra de aplicação é não permitir cadastrar o mesmo email
interface IRequest {
   user_id: string;
   avatarFilename: string;
}
class UpdateUserAvatarService { // reponsável por criar conta de usuários
    public async execute({user_id, avatarFilename }: IRequest): Promise<User> {
      const usersRepository = getCustomRepository(UsersRepository);// aqui pega o repositorio customizado, onde fica os métodos

      const user = await usersRepository.findById(user_id);// está fazendo a procura pelo id de usuário

      if(!user){
        throw new AppError('Usuário não encontrado.');
      }

      if (uploadConfig.driver === 's3') {
        const s3Provider = new S3StorageProvider(); // se existir configuração do upload ser s3 ele cria um disco para comunicar com o s3

        if (user.avatar) {
          await s3Provider.deleteFile(user.avatar);// se existe foto de avatar, vai deletar para poder substituir a foto atual
        }

        const filename = await s3Provider.saveFile(avatarFilename); // salva o arquivo com o nome do avatar que recebe por aparametro

        user.avatar = filename;
      } else {
        const diskProvider = new DiskStorageProvider();
        if (user.avatar) {
          await diskProvider.deleteFile(user.avatar);// se existe foto de avatar, vai deletar para poder substituir a foto atual
        } // e se não for s3 ele cria uma storge local e faz o processo de deltar o arquivo que ja tem e criar um novo atual no lugar do avatar
        const filename = await diskProvider.saveFile(avatarFilename);
        user.avatar = filename; // aqui passa o arquivo com o nome do avatar na variável de filename
      }

      await usersRepository.save(user);

      return user;
    }
}

export default UpdateUserAvatarService;
