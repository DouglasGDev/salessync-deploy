import { Request, Response } from "express";
import ShowOrderService from "../services/ShowOrderService";
import CreateOrderService from "../services/CreateOrderService";


export default class OrdersController {


  public async show(request:Request, response:Response): Promise<Response> {
    const { id } = request.params;

    const showOrder = new ShowOrderService(); // para mostrar um pedido

    const order = await showOrder.execute( { id});

    return response.json(order);// aqui retorna o pedido especifico no json
  }

  public async create(request:Request, response: Response): Promise<Response> { // para criar um produto
    const {customer_id, products} = request.body;

    const createOrder = new CreateOrderService();// chama o serviço reponsável por criar o pedido

    const order = await createOrder.execute({ // recebe os datos para criar o produto
      customer_id,
      products,
    });

    return response.json(order);// aqui retorna a resposta

  }


}
