import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors'; // ele serve pra tratar erros e evitar que o servidor fique parado sem receber resposta
import { errors } from 'celebrate';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm'; // por aqui ele procura automatico o arquivo ormconfig.json e faz conexão no db
import uploadConfig from '@config/upload';
import rateLimiter from './middlewares/rateLimiter';

const app = express();


app.use(cors());
app.use(express.json());

app.use(rateLimiter);

app.use('/files', express.static(uploadConfig.directory));// rota estática para acessar imagens de avatar de usuários no browser
app.use(routes);

app.use(errors());

// middleware para tratamento de erros
app.use((

  error: Error,
  request: Request,
  response: Response,
  next: NextFunction

  ) => {
    if (error instanceof AppError){ // verifica se o erro é uma instancia da classe AppError
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.log(error);
    console.log(error)
    return response.status(500).json({ // e se não for da instancia, erro desconhecido.
      status: 'error',
      message: 'Internal server error',// mensagem customzada de erro.
    });
  },
  );

app.listen(3333, () => {
  console.log('Servidor iniciado na porta 3333! 🏆');
});


