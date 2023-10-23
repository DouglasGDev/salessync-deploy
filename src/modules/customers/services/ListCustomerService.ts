import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";

// o serviço tem uma única responsabilidade de apenas listar os Clientes

class ListCustomerService {
    public async execute(): Promise<Customer[]> {
        const customersRepository = getCustomRepository(CustomersRepository);


        const customers = customersRepository.find()// aqui ele vai receber o nome fazer a busca do usuario no db

        return customers; // e aqui ele retorna os usuários
    }
}

export default ListCustomerService;
