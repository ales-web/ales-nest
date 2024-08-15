import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class CreateUserDto {
  id: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  roles: Role[];
}
