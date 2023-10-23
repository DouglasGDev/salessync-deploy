import { Request, Response } from "express";
import ListProductService from "../services/ListProductService";
import ShowProductService from "../services/ShowProductService";
import CreateProductService from "../services/CreateProductService";
import UpdateProductService from "../services/UpdateProductService";
import DeleteProductService from "../services/DeleteProductService";

export default class ProductController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = new ListProductService(); // para listar produtos

    const products = await listProducts.execute();

    return response.json(products);// aqui devolve a resposta em json e nisso tem a lista de produtos que foi chamado acima ListProductService
  }

  public async show(request:Request, response:Response): Promise<Response> {
    const { id } = request.params;

    const showProduct = new ShowProductService(); // para mostrar um produto

    const product = await showProduct.execute( { id});

    return response.json(product);// aqui retorna o produto especifico no json
  }

  public async create(request:Request, response: Response): Promise<Response> { // para criar um produto
    const {name,price,quantity} = request.body;

    const createProduct = new CreateProductService();// chama o serviço reponsável por criar o produto

    const product = await createProduct.execute({ // recebe os datos para criar o produto
      name,
      price,
      quantity,
    });

    return response.json(product);// aqui retorna a resposta

  }

  public async update(request:Request, response: Response): Promise<Response> {// aqui é o metodo para atualizar produto
    const {name,price,quantity} = request.body;
    const {id} = request.params;

    const updateProduct = new UpdateProductService(); // aqui chama o serviço responsável por atualizar

    const product = await updateProduct.execute({ // aqui passo os parametros para atualizar o produto
      id,
      name,
      price,
      quantity,
    });

    return response.json(product);// aqui retorna a resposta

  }

  public async delete(request:Request, response: Response): Promise<Response> { // metodo para deletar produto
    const{id} = request.params;

    const deleteProduct = new DeleteProductService(); // chama o serviço responsável para deletar o produto

    await deleteProduct.execute({ // aqui deleta o produto pelo id
      id
    });

    return response.json([]);// resposta de delete.

  }


}
