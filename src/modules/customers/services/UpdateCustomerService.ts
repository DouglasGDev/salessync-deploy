import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";
// o serviço tem uma única responsabilidade de apenas listar o cliente e atualizar
interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
    public async execute({id, name, email}:IRequest): Promise<Customer> {
        const customersRepository = getCustomRepository(CustomersRepository);

        const customer = await customersRepository.findById(id);// aqui ele vai receber o id fazer a busca do cliente no db

        if(!customer){
          throw new AppError('Usuário não encontrado.');// excessão
        }

        const customerExists = await customersRepository.findByEmail(email);

        if(customerExists && email !== customer.email){
          throw new AppError('Ja tem um usuário  com este email.'); // aqui garante que o email fornecido não seja atualizado por cliente diferente
        }

        customer.name = name;
        customer.email = email;

        await customersRepository.save(customer); // aqui salva a nome e email atualizada caso passou por todas verificações

        return customer; // e aqui ele retorna o cliente
    }
}

export default UpdateCustomerService;
