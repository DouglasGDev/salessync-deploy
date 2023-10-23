import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
import AppError from "@shared/errors/AppError";
import redisCache from "@shared/cache/RedisCache";
// o serviço tem uma única responsabilidade de apenas atualizar um produto

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
    public async execute({
      id,
      name,
      price,
      quantity,
    }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductRepository);


        const product = await productsRepository.findOne(id);// aqui ele vai receber o id e vai fazer a busca do produto no db

        if(!product) {
          throw new AppError('Não há resultados para a busca.');// se não houver resultado
        }

        const productExists = await productsRepository.findByName(name);

        if(productExists && name !== product.name) {
          throw new AppError('Há um produto com esse mesmo nome'); // aqui verifica se tem produto com o mesmo nome cadastrado, se houver não cadastra
        }

        //const redisCache = new RedisCache();// vai atuar como cache, abaixo se for atualizado o produto ele vai invalidar o serviço e atualizar o cache de produtos pesquisados e retorna o que há.

        await redisCache.invalidate('api-SalesSync-PRODUCT_LIST');// aqui ele faz o serviço de deletar o cache e fazer a substituição do cache atual.


        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await productsRepository.save(product);// aqui salva o update que vai mandar pro db

        return product; // e aqui ele retorna o produto
    }
}

export default UpdateProductService;
