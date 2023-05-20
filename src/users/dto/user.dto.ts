import { UserRole } from '@prisma/client';
import { plainToInstance, Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class UserDto {
  static create(data: Omit<UserDto, 'id'>) {
    return plainToInstance(this, data, { excludeExtraneousValues: true });
  }

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  password: string;

  @IsOptional()
  @Expose()
  role?: UserRole;
}
