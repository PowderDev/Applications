import { jwtConstants } from './constants';
import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { Token, TokenDto } from './dto/token.dto';

@Injectable()
export class TokenRepository {
  constructor(private redis: RedisService) {}

  async setToken(token: TokenDto): Promise<void> {
    await this.redis.set(
      `token/${token.userId}`,
      JSON.stringify(token),
      'EX',
      jwtConstants.refreshExpiresIn,
    );
  }

  async deleteToken(userId: number): Promise<void> {
    await this.redis.del(`token/${userId}`);
  }

  async findToken(userId: number): Promise<Token> {
    const stringifiedToken = await this.redis.get(`token/${userId}`);
    return JSON.parse(stringifiedToken) as Token;
  }
}
