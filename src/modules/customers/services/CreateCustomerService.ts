import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";

// o serviço tem uma única responsabilidade de apenas criar o usuário de cliente
// a regra de aplicação é não permitir cadastrar o mesmo email
interface IRequest {
   name: string;
   email: string;
}
class CreateCustomerService { // reponsável por criar conta de usuários dos clientes
    public async execute({name, email}: IRequest): Promise<Customer> {
      const customersRepository = getCustomRepository(CustomersRepository);// aqui pega o repositorio customizado, onde fica os métodos
      const emailExists = await customersRepository.findByEmail(email);// pega email do repositorio customizado

      if(emailExists) {
        throw new AppError('Esse endereço de email ja está em uso.'); // aqui verifica se o email ja existe
      }


      const customers = customersRepository.create({ // aqui prepara(só monta o objeto, não precisa do await) o objeto para ser enviado para o db
          name,
          email,
      });

      await customersRepository.save(customers);// aqui salva o que foi preparado e envia para o db

      return customers;
    }
}

export default CreateCustomerService;
