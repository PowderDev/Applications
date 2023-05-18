import { plainToInstance, Expose } from 'class-transformer';

export type Token = {
  userId: number;
  refreshToken: string;
};

export class TokenDto {
  static create(data: TokenDto) {
    return plainToInstance(this, data, { excludeExtraneousValues: true });
  }

  @Expose()
  userId: number;

  @Expose()
  refreshToken: string;
}
