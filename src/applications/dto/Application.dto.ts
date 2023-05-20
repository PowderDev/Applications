import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Application, ApplicationStatus } from '@prisma/client';
import { Transform, plainToInstance } from 'class-transformer';
import { PublicUserDto } from 'src/users/dto/PublicUser.dto';

export class ApplicationDto implements Application {
  static create(data: Application) {
    return plainToInstance(this, data);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  applicantId: number;

  @ApiProperty({ type: PublicUserDto })
  @Transform(({ value }) => {
    console.log(value);
    return PublicUserDto.create(value);
  })
  applicant: PublicUserDto;

  @ApiProperty()
  message: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  comment: string;

  @ApiPropertyOptional()
  staffMemberId: number;

  @ApiPropertyOptional({ type: PublicUserDto })
  @Transform(({ value }) => PublicUserDto.create(value))
  staffMember?: PublicUserDto;

  @ApiProperty({ enum: ApplicationStatus })
  status: ApplicationStatus;

  @ApiProperty()
  deleted: boolean;
}
