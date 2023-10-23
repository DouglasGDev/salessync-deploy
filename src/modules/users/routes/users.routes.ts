import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { celebrate, Joi, Segments } from 'celebrate';
import  multer  from 'multer';
import uploadConfig from '@config/upload';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

const upload = multer(uploadConfig.multer);

usersRouter.get('/',isAuthenticated, usersController.index);

usersRouter.post(
  '/',
  celebrate({ // middleware de validação
    [Segments.BODY]: {
      name: Joi.string().required(), // esta dizendo que é requerido o name para validar
      email: Joi.string().email().required(),// esta dizendo que é requerido o email e verificado se é email para validar
      password: Joi.string().required(),// esta dizendo que é requerido o password para validar
    },
  }),
  usersController.create
  );

usersRouter.patch( // aqui para dar o patch, atualizar o avatar do usuário
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),// verifica se está autenticado
  usersAvatarController.update,// middleware que pega o arquivo com a referencia do método do campo avatar

);

export default usersRouter;



