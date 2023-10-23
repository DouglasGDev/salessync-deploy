import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entities/Product";
import redisCache from "@shared/cache/RedisCache";
// o serviço tem uma única responsabilidade de apenas criar o produto
// a regra de aplicação é não permitir cadastrar o produto com mesmo nome
interface IRequest {
   name: string;
   price: number;
   quantity: number;
}

class CreateProductService {
    public async execute({name, price, quantity}: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductRepository);
        const productExists = await productsRepository.findByName(name);


        if(productExists) {
          throw new AppError('Há um produto com esse mesmo nome'); // aqui verifica se tem produuto com o mesmo nome cadastrado, se houver não cadastra
        }

        //const redisCache = new RedisCache();// para armazenar as informações pesquisadas em cache, por exemplo criar produtos aqui


        const product = productsRepository.create({ // aqui prepara(só monta o objeto, não precisa do await) o objeto para ser enviado para o db
            name,
            price,
            quantity,
        });

        await redisCache.invalidate('api-SalesSync-PRODUCT_LIST');// aqui invalida o cache se for adicionado um produto novo e faz atualizar o cache na pesquisa

        await productsRepository.save(product);// aqui salva o que foi preparado e envia para o db

        return product;
    }
}

export default CreateProductService;
