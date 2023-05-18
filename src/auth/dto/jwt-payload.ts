import { plainToInstance, instanceToPlain, Expose } from 'class-transformer';

export type JwtPayload = {
  id: number;
  email: string;
  is_staff_member: boolean;
};

export class JwtPayloadDto {
  static create(data: JwtPayload) {
    return plainToInstance(this, data, { excludeExtraneousValues: true });
  }

  toPlain() {
    return instanceToPlain(this);
  }

  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  is_staff_member: boolean;
}
