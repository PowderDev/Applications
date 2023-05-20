import { ApplicationStatus } from '@prisma/client';
import { plainToInstance, Expose } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateApplicationDto {
  static create(data: UpdateApplicationDto) {
    return plainToInstance(this, data, { excludeExtraneousValues: true });
  }

  @IsOptional()
  @Expose()
  @IsString()
  @MinLength(10, { message: 'Your comment has to be verbose!' })
  comment?: string;

  @IsOptional()
  @Expose()
  @IsNumber()
  staffMemberId?: number;

  @IsOptional()
  @Expose()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;

  @IsOptional()
  @Expose()
  @IsBoolean()
  deleted?: boolean;
}
