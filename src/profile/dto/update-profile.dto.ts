import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsUrl } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  role: Role;

  @ApiProperty()
  @IsUrl()
  avatar: string;
}
