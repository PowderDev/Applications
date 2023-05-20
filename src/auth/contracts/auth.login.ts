import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export namespace AuthLogin {
  export class Request {
    @ApiProperty()
    @IsEmail()
    @Expose()
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    @Expose()
    password: string;
  }

  export class Response {
    @ApiProperty()
    accessToken: string;
  }
}
