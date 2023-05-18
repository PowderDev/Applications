import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { TokenService } from 'src/auth/token.service';
import { UsersRepository } from './users.repository';
import { PublicUserDto } from './dto/PublicUser.dto';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private tokenService: TokenService,
  ) {}

  async findByEmail(username: string): Promise<PublicUserDto | never> {
    const user = await this.usersRepository.findByEmail(username);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return PublicUserDto.create(user);
  }

  async isUserExists(email: string): Promise<boolean> {
    const user = await this.usersRepository.findByEmail(email);
    return !!user;
  }

  async createUser(dto: UserDto): Promise<PublicUserDto> {
    const user = await this.usersRepository.createUser(dto);
    return PublicUserDto.create(user);
  }

  async deleteUser(id: number): Promise<void> {
    await this.tokenService.deleteToken(id);
    await this.usersRepository.deleteUser(id);
  }
}
