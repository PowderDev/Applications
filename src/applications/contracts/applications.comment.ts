import { Expose } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';
import { ApplicationDto } from '../dto/Application.dto';
import { ApiProperty } from '@nestjs/swagger';

export namespace ApplicationComment {
  export class Request {
    @ApiProperty()
    @Expose()
    @IsString()
    @MinLength(10, { message: 'Your comment has to be verbose!' })
    comment: string;
  }

  export class Response extends ApplicationDto {}
}
