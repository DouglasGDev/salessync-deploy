import nodemailer from 'nodemailer';// email falso para enviar no esqueci uma senha ou resetar.
import HandlebarsMailTemplate from './HandlebarsMailTemplate';

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


export default class EtherealMail {
  static async sendMail({ to, from,subject,templateData }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount(); //  conta de teste

    const mailTemplate = new HandlebarsMailTemplate();

    const transporter = await nodemailer.createTransport({ // metodo smtp de transporte de dados
      host: account.smtp.host, // smtp é a porta de transferencia de email simples, ai precisa desses parametros
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: account.user,
            pass: account.pass
        }
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Equipe Api Vendas',
        address: from?.email || 'equipe@apivendas.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId); // o %s é para pegar o valor da variável que está depois da virgula e innclui dentro da mensagem
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }


}
