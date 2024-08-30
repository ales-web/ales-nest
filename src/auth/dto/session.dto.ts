import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';
import { ProfileDto } from 'src/profile/dto';

export class SessionDto {
  @ApiProperty()
  @IsJWT()
  accessToken: string;

  @ApiProperty()
  @IsJWT()
  refreshToken: string;

  @ApiProperty()
  profile: ProfileDto;
}
