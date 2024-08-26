import {
  IsArray,
  IsEmail,
  IsEnum,
  IsJWT,
  IsString,
  IsUrl,
} from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    type: String,
  })
  @IsJWT()
  accessToken: string;
  @ApiProperty({
    type: String,
  })
  @IsJWT()
  refreshToken: string;
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  role: Role;

  @ApiProperty()
  @IsString()
  @IsUrl()
  avatar: string;
}
