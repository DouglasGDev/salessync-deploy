import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import CustomersController from '../controllers/CustomersController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';


const customersRouter = Router();// para criar rota
const customersController = new CustomersController();// para chamar o controlador de serviço

customersRouter.use(isAuthenticated);// middleware de autenticação para fazer qualquer operação nessas rotas abaixo
customersRouter.get('/', customersController.index); // aqui acessa os clientes

customersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),//valida se tem parametro de id correto, não vai deixar solicitar se não tiver válido, middleware de validação
  },
  }),
  customersController.show); // aqui acessa o cliente expecifico pelo id

  customersRouter.post(
  '/',
  celebrate({ // middleware de validação
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  customersController.create,); // aqui cria um cliente

  customersRouter.put(
  '/:id',
  celebrate({ // middleware de validação
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),//valida se tem parametro de id correto, não vai deixar solicitar se não tiver válido, middleware de validação
    },
  },),
  customersController.update); // aqui atualiza um cliente

  customersRouter.delete(
  '/:id',
  celebrate({ // middleware de validação
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),//valida se tem parametro de id correto, não vai deixar solicitar se não tiver válido, middleware de validação
    },
  }),
  customersController.delete); // aqui deleta um cliente


export default customersRouter;
