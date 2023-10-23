import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Order from "../typeorm/entities/Order";
import { OrdersRepository } from "../typeorm/repositories/OrdersRepository";

// o serviço tem uma única responsabilidade de apenas mostrar o pedido

interface IRequest {
   id: string;
}

class ShowOrderService {
    public async execute({id}: IRequest): Promise<Order> {
        const ordersRepository = getCustomRepository(OrdersRepository);


        const order = await ordersRepository.findById(id);

        if(!order) {
          throw new AppError('Não foi encontrado nenhum pedido'); // aqui verifica se não tem pedido  cadastrado  e lança o erro
        }

          return order;

    }
}

export default ShowOrderService;
