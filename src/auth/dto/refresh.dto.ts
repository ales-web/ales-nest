import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsString } from 'class-validator';

export class RefreshDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsJWT()
  refreshToken: string;
}
