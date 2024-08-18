import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
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
}
