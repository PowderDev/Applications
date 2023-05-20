import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { plainToInstance, Expose } from 'class-transformer';

export class PublicUserDto {
  static create(data: PublicUserDto): PublicUserDto {
    return plainToInstance(this, data, { excludeExtraneousValues: true });
  }

  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty({ enum: UserRole })
  @Expose()
  role: UserRole;
}
