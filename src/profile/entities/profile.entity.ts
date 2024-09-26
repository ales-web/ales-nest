import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class ProfileEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ enum: Role })
  role: Role;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  youtube: string;

  @ApiProperty()
  instagram: string;

  @ApiProperty()
  telegram: string;

  @ApiProperty()
  whatsapp: string;

  @ApiProperty()
  viber: string;
}
