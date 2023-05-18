import { jwtConstants } from './constants';
import { Injectable } from '@nestjs/common';
import { TokenDto } from './dto/token.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, JwtPayloadDto } from './dto/jwt-payload';
import { TokenRepository } from './token.repository';

@Injectable()
export class TokenService {
  constructor(
    private jwt: JwtService,
    private tokenRepository: TokenRepository,
  ) {}

  async generateTokens(payload: JwtPayloadDto) {
    const accessToken = this.jwt.sign(payload.toPlain());
    const refreshToken = this.jwt.sign(payload.toPlain(), {
      expiresIn: jwtConstants.refreshExpiresIn,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(token: TokenDto): Promise<void> {
    await this.tokenRepository.setToken(token);
  }

  async deleteToken(userId: number): Promise<void> {
    await this.tokenRepository.deleteToken(userId);
  }

  validateToken(token: string): JwtPayload {
    return this.jwt.verify(token);
  }

  async findToken(userId: number): Promise<TokenDto> {
    return this.tokenRepository.findToken(userId);
  }
}
