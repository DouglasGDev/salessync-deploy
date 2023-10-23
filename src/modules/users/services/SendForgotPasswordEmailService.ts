import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import EtherealMail from "@config/mail/EtherealMail";
import AppError from "@shared/errors/AppError";
import path from 'path';
import SESMail from "@config/mail/SESMail";
import mailConfig from '@config/mail/mail';

// o serviço tem uma única responsabilidade de apenas enviar a recuperação de senha por e-mail do usuário
interface IRequest {
   email: string;
}
class SendForgotPasswordEmailService { // reponsável por enviar o email de recuperação de senha
    public async execute({ email }: IRequest): Promise<void> {
      const usersRepository = getCustomRepository(UsersRepository);// aqui pega o repositorio customizado, onde fica os métodos
      const userTokensRepository = getCustomRepository(UserTokensRepository);// repositorio de token dos usuários

      const user = await usersRepository.findByEmail(email);

      if(!user){
        throw new AppError('Usuário não encontrado.'); // aqui verifica se o email disponibilizado foi encontrado e se não foi da esse erro.
      }

      const {token} = await userTokensRepository.generate(user.id);// aqui passa o id de usuário para se gerar o token

      const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

      if (mailConfig.driver === 'ses') {
        await SESMail.sendMail({
          to: {
            name: user.name,
            email: user.email,

          },
          subject: '[SaleSync] Recuperação de senha',
          templateData: {
            file: forgotPasswordTemplate, // arquivo do template
            variables: {
              name: user.name,
              link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,

            }
          }, // aqui está mandando o token pro ses da amazon
        });
        return;
      }

      await EtherealMail.sendMail({
        to: {
          name: user.name,
          email: user.email,

        },
        subject: '[SaleSync] Recuperação de senha',
        templateData: {
          file: forgotPasswordTemplate, // arquivo do template
          variables: {
            name: user.name,
            link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,

          }
        }, // aqui está mandando o token pro fake email
      });
    }
}

export default SendForgotPasswordEmailService;
