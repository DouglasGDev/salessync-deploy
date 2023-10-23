import { EntityRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}


// isso vai retornar o produto pesquisado.
@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {

  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productsIds = products.map(product => product.id); // recebe a entidade products as ele mapeia somente o id de cada produto em um array

    const existsProduct= await this.find({
      where: {
        id: In(productsIds),// aqui ele procura os ids mapeados e verifica se são validos no repositorio
      }
    })

    return existsProduct;// e retorna eles
  }

}
