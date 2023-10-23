import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import OrdersController from '../controllers/OrdersController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';


const ordersRouter = Router();// para criar rota
const ordersController = new OrdersController();// para chamar o controlador de serviço

ordersRouter.use(isAuthenticated);// controle de autenticação

ordersRouter.get('/', ordersController.show); // aqui acessa os pedidos

ordersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),//valida se tem parametro de id correto, não vai deixar solicitar se não tiver válido, middleware de validação
  },
  }),
  ordersController.show); // aqui acessa o pedido expecifico pelo id

ordersRouter.post(
  '/',
  celebrate({ // middleware de validação
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.required()
    },
  }),
  ordersController.create,); // aqui cria um pedido



export default ordersRouter;
