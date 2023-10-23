import { Router } from 'express';
import ProductController from '../controllers/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';


const productsRouter = Router();// para criar rota
const productsController = new ProductController();// para chamar o controlador de serviço

productsRouter.get('/', productsController.index); // aqui acessa os produtos

productsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),//valida se tem parametro de id correto, não vai deixar solicitar se não tiver válido, middleware de validação
  },
  }),
  productsController.show); // aqui acessa o produto expecifico pelo id

productsRouter.post(
  '/',
  celebrate({ // middleware de validação
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),// aqui a precisão de casas decimais no preço
      quantity: Joi.number().required(),
    },
  }),
  productsController.create,); // aqui cria um produto

productsRouter.put(
  '/:id',
  celebrate({ // middleware de validação
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),//valida se tem parametro de id correto, não vai deixar solicitar se não tiver válido, middleware de validação
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),// aqui a precisão de casas decimais no preço
      quantity: Joi.number().required(),
    },
  },),
  productsController.update); // aqui atualiza um produto

productsRouter.delete(
  '/:id',
  celebrate({ // middleware de validação
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),//valida se tem parametro de id correto, não vai deixar solicitar se não tiver válido, middleware de validação
    },
  }),
  productsController.delete); // aqui deleta um produto


export default productsRouter;
