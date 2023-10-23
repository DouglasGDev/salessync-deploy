import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
import redisCache from "@shared/cache/RedisCache";
// o serviço tem uma única responsabilidade de apenas listar o produto

class ListProductService {
    public async execute(): Promise<Product[]> {
        const productsRepository = getCustomRepository(ProductRepository);

        //const redisCache = new RedisCache();// para armazenar as informações pesquisadas em cache, por exemplo lista de produtos aqui

        let products = await redisCache.recover<Product[]>('api-SalesSync-PRODUCT_LIST',);// chave da lista de produtos a ser salva, no caso um array

        if(!products) {
          products =await productsRepository.find();// aqui ele vai receber o nome fazer a busca do produto no db

          await redisCache.save('api-SalesSync-PRODUCT_LIST', products);// aqui ele busca no db caso não tenha nada no cache e cria um novo cache dos produtos listados
        }

        return products; // e aqui ele retorna os produtos
    }
}

export default ListProductService;
