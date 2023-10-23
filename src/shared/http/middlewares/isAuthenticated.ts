import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "@config/auth";

interface ITokenPayload { // interface para tipagem do token, dos arquivos que está nele
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated (
  request: Request,
  response: Response,
  next: NextFunction
  ): void {
    const authHeader = request.headers.authorization; // é onde vem o token de autorização

    if(!authHeader) {
      throw new AppError('Não existe um token JWT enviado.');
    }

  // Bearer Token
    const [, token] = authHeader.split(' ');// ele separa em 2 campos, um que é o Bearer e o outro que é o que precismos, o token

    try {
      const decodedToken = verify(token, authConfig.jwt.secret); //verifica o token e a secret que foi usada na aplicação pra ver se bate


      const { sub } = decodedToken as ITokenPayload; // id do usuário


      request.user = {
        id: sub,
      }

      return next(); // deixa prosseguir para a próxima página
    } catch{
      throw new AppError('JWT Token inválido.');
    }
  }
