import { Expose } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';
import { ApplicationDto } from '../dto/Application.dto';
import { ApiProperty } from '@nestjs/swagger';

export namespace ApplicationCreate {
  export class Request {
    @ApiProperty()
    @Expose()
    @IsString()
    @MinLength(10, { message: 'Your message has to be verbose!' })
    message: string;
  }

  export class Response extends ApplicationDto {}
}
