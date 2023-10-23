import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({ // middleware de validação
    [Segments.BODY]: {
      email: Joi.string().email().required(),// esta dizendo que é requerido o email e verificado se é email para validar
    },
  }),
  forgotPasswordController.create // rota de esqueceu a senha, apor ai requere o e-mail para fazer o envio do link com duração de 2h
  );


  passwordRouter.post(
    '/reset',
    celebrate({ // middleware de validação
      [Segments.BODY]: {
        token: Joi.string().uuid().required(),// esta dizendo que é requerido o email e é do tipo uuid e é requerido
        password: Joi.string().required(),// aqui esta requerindo o campo da senha que é uma string
        password_confirmation: Joi.string().required().valid(Joi.ref('password'))// aqui ele vai validar se foi digitado a mesma senha, e compara com o campo password
      },

    }),
    resetPasswordController.create // rota de reset de senha
    );


export default passwordRouter;



