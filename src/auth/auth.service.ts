import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/users/dto/user.dto';
import { TokenService } from './token.service';
import { JwtPayload, JwtPayloadDto } from './dto/jwt-payload';
import { AuthDto } from './dto/auth.dto';
import { TokenDto } from './dto/token.dto';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private tokenService: TokenService,
  ) {}

  async registration(dto: AuthDto) {
    const { email, name, password } = dto;
    const candidate = await this.usersRepository.findByEmail(email);

    if (candidate) {
      throw new HttpException(
        'User with this username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 3);
    const userToCreate = UserDto.create({
      email,
      name,
      password: hashedPassword,
    });
    const newUser = await this.usersRepository.createUser(userToCreate);

    return this.getNewTokens(JwtPayloadDto.create(newUser));
  }

  async login(dto: AuthDto) {
    const { email, password } = dto;
    const candidate = await this.usersRepository.findByEmail(email);

    if (!candidate) {
      throw new HttpException(
        'Provided credentials are invalid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPasswordEqual = await bcrypt.compare(password, candidate.password);

    if (!isPasswordEqual) {
      throw new HttpException(
        'Provided credentials are invalid',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.getNewTokens(JwtPayloadDto.create(candidate));
  }

  async logout(userId: number) {
    await this.tokenService.deleteToken(userId);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    let userData: JwtPayload;

    try {
      userData = this.tokenService.validateToken(refreshToken);
    } catch {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const tokenData = await this.tokenService.findToken(userData.id);

    if (!tokenData) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return this.getNewTokens(JwtPayloadDto.create(userData));
  }

  async getNewTokens(payload: JwtPayloadDto) {
    const jwtTokens = await this.tokenService.generateTokens(payload);

    const token = TokenDto.create({
      userId: payload.id,
      refreshToken: jwtTokens.refreshToken,
    });
    await this.tokenService.saveToken(token);

    return jwtTokens;
  }
}
