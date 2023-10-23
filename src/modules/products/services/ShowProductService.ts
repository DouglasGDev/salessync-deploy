import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
import AppError from "@shared/errors/AppError";
// o serviço tem uma única responsabilidade de apenas procurar um produto

interface IRequest {
  id: string;
}

class ShowProductService {
    public async execute({id}: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductRepository);


        const product = await productsRepository.findOne(id);// aqui ele vai receber o id e vai fazer a busca do produto no db

        if(!product) {
          throw new AppError('Não há resultados para a busca.');// se não houver resultado
        }

        return product; // e aqui ele retorna o produto
    }
}

export default ShowProductService;
