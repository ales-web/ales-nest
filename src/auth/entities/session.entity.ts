import { ApiProperty } from '@nestjs/swagger';
import { ProfileEntity } from 'src/profile/entities';

export class SessionEntity {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  profile: ProfileEntity;
}
