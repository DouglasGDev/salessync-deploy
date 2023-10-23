import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";
// o serviço tem uma única responsabilidade de apenas listar o cliente

interface IRequest {
  id: string;
}

class ShowCustomerService {
    public async execute({id}:IRequest): Promise<Customer> {
        const customersRepository = getCustomRepository(CustomersRepository);


        const customer = await customersRepository.findById(id);// aqui ele vai receber o id fazer a busca do cliente no db

        if(!customer){
          throw new AppError('Cliente não encontrado.');// excessão
        }

        return customer; // e aqui ele retorna o cliente
    }
}

export default ShowCustomerService;
