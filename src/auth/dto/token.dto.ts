import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class TokenDto {
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
}
