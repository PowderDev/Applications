import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsEnum,
} from 'class-validator';

export namespace AuthRegistration {
  export class Request {
    @ApiProperty()
    @IsEmail()
    @Expose()
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(2)
    @Expose()
    name: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    @Expose()
    password: string;

    @ApiPropertyOptional({
      enum: UserRole,
    })
    @IsOptional()
    @Expose()
    @IsEnum(UserRole)
    role?: UserRole;
  }

  export class Response {
    @ApiProperty()
    accessToken: string;
  }
}
