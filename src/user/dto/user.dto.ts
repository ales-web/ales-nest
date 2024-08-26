import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsString,
  IsUrl,
} from 'class-validator';

export class UserDto {
  @ApiProperty({
    type: Number,
  })
  @IsInt()
  id: number;
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsEmail()
  email: string;
  @ApiProperty({
    type: String,
  })
  @IsString()
  password: string;
  @ApiProperty({
    type: Date,
  })
  @IsDate()
  createdAt: Date;
  @ApiProperty({
    type: Date,
  })
  @IsDate()
  updatedAt: Date;

  @ApiProperty()
  @IsString()
  @IsUrl()
  avatar: string;

  @IsEnum(Role)
  role: Role;
}
