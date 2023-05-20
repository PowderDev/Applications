import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApplicationStatus } from '@prisma/client';
import { plainToInstance, Expose } from 'class-transformer';
import { IsBoolean, IsDateString, IsEnum, IsOptional } from 'class-validator';

export class ApplicationFiltersDto {
  static create(data: ApplicationFiltersDto) {
    return plainToInstance(this, data, { excludeExtraneousValues: true });
  }

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  @IsBoolean()
  deleted?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  @IsDateString()
  from?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  @IsDateString()
  to?: string;
}
