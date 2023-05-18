import { RedisOptions } from 'ioredis';

export function getRedisOptions(): RedisOptions {
  return {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  };
}
