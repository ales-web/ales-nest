import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsJWT } from 'class-validator';

export class TokenDto {
  @ApiProperty({
    type: String,
  })
  @IsJWT()
  access_token: string;
  @ApiProperty({
    type: Date,
  })
  @IsDate()
  exp: Date;
}
