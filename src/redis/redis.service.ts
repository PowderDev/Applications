import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { getRedisOptions } from './helpers';

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
  constructor() {
    super(getRedisOptions());
  }

  async onModuleDestroy() {
    await this.quit();
  }
}
