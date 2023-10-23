import nodemailer from 'nodemailer';// email falso para enviar no esqueci uma senha ou resetar.
import aws from 'aws-sdk';// para fazer comunicação com os serviços da aws.
import HandlebarsMailTemplate from './HandlebarsMailTemplate';
import mailConfig from '@config/mail/mail';// configuração para usar o serviço de email

interface IMailContact {
  name: string;
  email: string;
}

interface ITemplateVariable {
  [key: string]: string | number; // aqui foi criado para receber variáveis dinamicas, varios tipos
}

interface IParseMailTemplate { // essa interface é para definir o parse abaixo, ou seja, o parse é responsável por transmitir o html, a estrutura
  file: string;
  variables:  ITemplateVariable;
}

interface ISendMail { // interface que recebe os parametros pra passar pra classe de enviar email abaixo.
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}


export default class SESMail {
  static async sendMail({ to, from,subject,templateData }: ISendMail): Promise<void> {

    const mailTemplate = new HandlebarsMailTemplate();

    const transporter = await nodemailer.createTransport({ // metodo smtp de transporte de dados
      SES: new aws.SES({
        apiVersion: '2010-12-01', // configuração da api da amazon
      }),
    });

    const {email, name} = mailConfig.defaults.from;

    const message = await transporter.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });

  }


}
