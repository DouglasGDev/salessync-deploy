import { RedisOptions } from 'ioredis';

interface ICacheConfig { // isso é uma interface de tipagem para o typescript funcionar corretamente.
  config: {
    redis: RedisOptions;
  }
  driver: string;
}

export default { // configuração global do redis, para conxão ao redis e servir de cache
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASS || undefined
    },
  },
  driver: 'redis',
} as ICacheConfig;
