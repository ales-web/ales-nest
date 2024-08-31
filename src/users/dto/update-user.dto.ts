import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  @IsString()
  password: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  @IsUrl()
  avatar?: string;

  @ApiProperty({ enum: Role })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
