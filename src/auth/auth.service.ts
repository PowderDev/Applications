import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/users/dto/user.dto';
import { TokenService } from './token.service';
import { JwtPayload, JwtPayloadDto } from './dto/jwt-payload';
import { TokenDto } from './dto/token.dto';
import { UsersRepository } from 'src/users/users.repository';
import { MailService } from 'src/mail/mail.service';
import { AuthRegistration } from './contracts/auth.registration';
import { AuthLogin } from './contracts/auth.login';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private tokenService: TokenService,
    private mailService: MailService,
  ) {}

  async registration(dto: AuthRegistration.Request) {
    const { email, password } = dto;
    const candidate = await this.usersRepository.findByEmail(email);

    if (candidate) {
      throw new HttpException(
        'User with this username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 3);
    const userToCreate = UserDto.create({
      ...dto,
      password: hashedPassword,
    });
    const newUser = await this.usersRepository.createUser(userToCreate);

    this.mailService.onAuthMail(newUser.name);

    return this.getNewTokens(JwtPayloadDto.create(newUser));
  }

  async login(dto: AuthLogin.Request) {
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
      userData = this.tokenService.validateToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET,
      );
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
