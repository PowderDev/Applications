import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtPayload } from '../dto/jwt-payload';
import { jwtConstants } from '../constants';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private redis: RedisService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
      ignoreExpiration: false,
    } as StrategyOptions);
  }

  validate(payload: JwtPayload): JwtPayload {
    const isTokenExists = this.redis.exists(`token/${payload.id}`);

    if (!isTokenExists) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return payload;
  }
}
