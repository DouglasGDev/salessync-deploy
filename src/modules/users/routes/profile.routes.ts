import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';// usado para validação de dados
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import ProfileController from '../controllers/ProfileController';


const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticated);

profileRouter.get('/', profileController.show);

profileRouter.put(
  '/',
  celebrate({ // middleware de validação
    [Segments.BODY]: {
      name: Joi.string().required(), // esta dizendo que é requerido o name para validar
      email: Joi.string().email().required(),// esta dizendo que é requerido o email e verificado se é email para validar
      old_password: Joi.string(),// só verifica aqui a senha anterior
      password: Joi.string().optional(),// esta dizendo que é opcional o password para validar e atualizar caso for
      password_confirmation: Joi.string()
      .valid(Joi.ref('password')) // o valor que está aqui tem que ser igual ao valor do campo password, se for diferente da erro
      .when('password', {
        is: Joi.exist(),//verifica se o passwor está preenchido, e valida se bate as senhas
        then: Joi.required(),// então inclua no confirmation o requerido
      })
    },
  }),
  profileController.update
  );



export default profileRouter;



