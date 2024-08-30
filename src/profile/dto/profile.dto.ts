import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsDate, IsEmail, IsEnum, IsInt, IsUrl } from 'class-validator';

export class ProfileDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  role: Role;

  @ApiProperty()
  @IsUrl()
  avatar: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}

// export type Profile = {
//   id: number;
//   name: string;
//   email: string;
//   role: Role;

//   avatar?: string | null;

//   createdAt: Date;
//   updatedAt: Date;
// };

// export interface Session {
//   accessToken: string;
//   refreshToken: string;
//   profile: Profile;
// }
