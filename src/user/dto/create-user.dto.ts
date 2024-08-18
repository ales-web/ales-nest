import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  id: number;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}
