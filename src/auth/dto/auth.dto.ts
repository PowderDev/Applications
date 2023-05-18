import { plainToInstance, Expose } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  static create(data: AuthDto) {
    return plainToInstance(this, data, { excludeExtraneousValues: true });
  }

  @IsEmail()
  @Expose()
  email: string;

  @IsString()
  @MinLength(2)
  @Expose()
  name: string;

  @IsString()
  @MinLength(6)
  @Expose()
  password: string;
}
