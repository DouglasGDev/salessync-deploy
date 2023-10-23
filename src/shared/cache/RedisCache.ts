import Redis, {Redis as RedisClient} from 'ioredis';
import cacheConfig from '@config/cache';

// isso é para configurar o Redis e colocar ele em funcionamento

class RedisCache {
  private client: RedisClient;
  private connected = false;

  constructor() {
    if(!this.connected){
      this.client = new Redis(cacheConfig.config.redis);
      this.connected = true;
    }
  }

  public async save(key: string, value: any) : Promise<void> { // salvar cache
    await this.client.set(key, JSON.stringify(value));// pode ser passado um objeto(que contém array, qualquer coisa, pq não sabemos exatamente o dado), mas vai ser convertido no proprio json para string, para não pessar no redis

  }

  public async recover<T>(key: string): Promise<T | null> {// get, pesquisa, ele vai pegar a pesquisa do listar e transformar a lista em string, caso não encontre nada ele volta os dados ao que era antes e
    // salva na variavel que faz voltar o array ao que era e retorna a variável
    const data = await this.client.get(key);

    if(!data){
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;

  }

   public async invalidate(key: string) : Promise<void> { // delete, vai servir para deletar cache para não ficar armazenando informação e lotar
    // pega a chave invalida e deleta do cache
    await this.client.del(key);
   }
}
export default new RedisCache();
