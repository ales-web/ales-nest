import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsInt, IsString } from 'class-validator';

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
}
