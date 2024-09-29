import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '@user/dto';
import { IsEmail, IsString } from 'class-validator';

export class RegisterDto extends CreateUserDto {
  // @ApiProperty({
  //   type: String,
  // })
  // @IsString()
  // @IsEmail()
  // email: string;
  // @ApiProperty({
  //   type: String,
  // })
  // @IsString()
  // password: string;
}
