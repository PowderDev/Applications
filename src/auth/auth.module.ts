import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { PassportModule } from '@nestjs/passport';
import { TokenService } from './token.service';
import { RedisService } from 'src/redis/redis.service';
import { UsersModule } from 'src/users/users.module';
import { TokenRepository } from './token.repository';

@Global()
@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  providers: [
    AuthService,
    TokenService,
    TokenRepository,
    RedisService,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService, TokenService],
})
export class AuthModule {}
