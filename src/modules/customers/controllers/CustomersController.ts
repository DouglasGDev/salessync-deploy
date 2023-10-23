import { Request, Response } from "express";
import ListCustomerService from "../services/ListCustomerService";
import ShowCustomerService from "../services/ShowCustomerService";
import CreateCustomerService from "../services/CreateCustomerService";
import UpdateCustomerService from "../services/UpdateCustomerService";
import DeleteCustomerService from "../services/DeleteCustomerService";


export default class CustomersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCostumers = new ListCustomerService(); // para listar clientes
    const costumers = await listCostumers.execute();

    return response.json(costumers);// aqui devolve a resposta em json e nisso tem a lista de clientes que foi chamado acima
  }

  public async show(request:Request, response:Response): Promise<Response> {
    const { id } = request.params;

    const showCustomer = new ShowCustomerService(); // para mostrar um cliente

    const customer = await showCustomer.execute( { id});

    return response.json(customer);// aqui retorna o cliente especifico no json
  }

  public async create(request:Request, response: Response): Promise<Response> { // para criar um cliente
    const {name, email} = request.body;

    const createCustomer = new CreateCustomerService();// chama o serviço reponsável por criar o cliente

    const customer = await createCustomer.execute({ // recebe os datos para criar o cliente
      name,
      email
    });

    return response.json(customer);// aqui retorna a resposta

  }

  public async update(request:Request, response: Response): Promise<Response> {// aqui é o metodo para atualizar cliente
    const {name, email} = request.body;
    const {id} = request.params;

    const updateCustomer = new UpdateCustomerService(); // aqui chama o serviço responsável por atualizar

    const customer = await updateCustomer.execute({ // aqui passo os parametros para atualizar o cliente
      id,
      name,
      email,
    });

    return response.json(customer);// aqui retorna a resposta

  }

  public async delete(request:Request, response: Response): Promise<Response> { // metodo para deletar cliente
    const{id} = request.params;

    const deleteCustomer = new DeleteCustomerService(); // chama o serviço responsável para deletar o cliente

    await deleteCustomer.execute({ // aqui deleta o produto pelo id
      id
    });

    return response.json([]);// resposta de delete.

  }


}
