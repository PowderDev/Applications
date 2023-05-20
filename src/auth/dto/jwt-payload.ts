import { UserRole } from '@prisma/client';
import { plainToInstance, instanceToPlain, Expose } from 'class-transformer';

export type JwtPayload = {
  id: number;
  email: string;
  role: UserRole;
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
  role: UserRole;
}
