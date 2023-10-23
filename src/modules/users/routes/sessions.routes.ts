import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';
import { celebrate, Joi, Segments } from 'celebrate';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
  '/',
  celebrate({ // middleware de validação
    [Segments.BODY]: {
      email: Joi.string().email().required(),// esta dizendo que é requerido o email e verificado se é email para validar
      password: Joi.string().required(),// esta dizendo que é requerido o password para validar
    },
  }),
  sessionsController.create
  );

export default sessionsRouter;



