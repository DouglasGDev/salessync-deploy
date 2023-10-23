import { Request, Response } from "express";
import SendForgotPasswordEmailService from "../services/SendForgotPasswordEmailService";


export default class ForgotPasswordController {

  public async create(request: Request, response: Response): Promise<Response>{
    const {email} = request.body; // aqui armazena as variaveis os valores que vem do body

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService();

    await sendForgotPasswordEmail.execute({
      email,
    }); // aqui espera enviar o email

     return response.status(204).json();// aqui envia resposta no formato json que é tudo ocrreu tudo bem mas não tem nada para mostrar
  }
}
