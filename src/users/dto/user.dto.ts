import { plainToInstance, Expose } from 'class-transformer';

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
}
