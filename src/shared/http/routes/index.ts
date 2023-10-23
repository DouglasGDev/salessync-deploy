import { Router } from "express";
import productsRouter from "@modules/products/routes/products.routes";
import usersRouter from "@modules/users/routes/users.routes";
import sessionsRouter from "@modules/users/routes/sessions.routes";
import passwordRouter from "@modules/users/routes/password.routes";
import profileRouter from "@modules/users/routes/profile.routes";
import customersRouter from "@modules/customers/routes/customers.routes";
import ordersRouter from "@modules/orders/routes/orders.routes";

const routes = Router();

// rotas de api, rota especifica para cada métod da aplicação
routes.use('/products', productsRouter);// rota dos produtos, onde tem o crud deles
routes.use('/users', usersRouter); // rota de usuarios, criar e listar
routes.use('/sessions', sessionsRouter);// rota de autenticação da sessão
routes.use('/password', passwordRouter);// rota que mexe com senhas
routes.use('/profile', profileRouter); // rota de perfil de usuário
routes.use('/customers', customersRouter)// rota de clientes
routes.use('/orders', ordersRouter)// rota de pedidos
export default routes;
