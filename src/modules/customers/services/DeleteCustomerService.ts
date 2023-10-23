import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";
// o serviço tem uma única responsabilidade de apenas deletar o cliente

interface IRequest {
  id: string;
}

class DeleteCustomerService {
    public async execute({id}:IRequest): Promise<void> {
        const customersRepository = getCustomRepository(CustomersRepository);


        const customer = await customersRepository.findById(id);// aqui ele vai receber o id fazer a busca do cliente no db

        if(!customer){
          throw new AppError('Cliente não encontrado.');// excessão
        }

        await customersRepository.remove(customer);// aqui deleta o cliente
    }
}

export default DeleteCustomerService;
