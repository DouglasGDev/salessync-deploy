import { Request, Response } from "express";
import ResetPasswordService from "../services/ResetPasswordService";



export default class ResetPasswordController {

  public async create(request: Request, response: Response): Promise<Response>{
    const { password, token } = request.body; // aqui armazena as variaveis os valores que vem do body

    const resetPassword = new ResetPasswordService();

    await resetPassword.execute({
      password,
      token,
    }); // aqui espera enviar o token e o email

     return response.status(204).json();// aqui envia resposta no formato json que é tudo ocrreu tudo bem mas não tem nada para mostrar
  }
}
