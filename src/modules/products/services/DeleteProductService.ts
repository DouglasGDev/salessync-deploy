import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
import redisCache from "@shared/cache/RedisCache";
// o serviço tem uma única responsabilidade de apenas deletar um produto

interface IRequest {
  id: string;
}

class DeleteProductService {
    public async execute({id}: IRequest): Promise<void> {
        const productsRepository = getCustomRepository(ProductRepository);


        const product = await productsRepository.findOne(id);// aqui ele vai receber o id e vai fazer a busca do produto no db

        if(!product) {
          throw new AppError('Não há resultados para a busca.');// se não houver resultado
        }

        //const redisCache = new RedisCache();// vai atuar como cache, abaixo se for deletado o produto ele vai invalidar o serviço e tualizar o cache de produtos pesquisados e retorna o que há.

        await redisCache.invalidate('api-SalesSync-PRODUCT_LIST');// aqui ele faz o serviço de deletar o cache e fazer a substituição do cache atual.

        await productsRepository.remove(product);// aqui remove o produto do db

    }
}

export default DeleteProductService;
