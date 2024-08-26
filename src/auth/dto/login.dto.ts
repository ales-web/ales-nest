import { IsArray, IsEmail, IsEnum, IsString, IsUrl } from 'class-validator';
import { TokenDto } from './token.dto';
import { Roles } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  tokens: TokenDto;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsEnum(Roles, { each: true })
  @IsArray()
  roles: Roles[];

  @IsString()
  @IsUrl()
  avatar: string;
}
