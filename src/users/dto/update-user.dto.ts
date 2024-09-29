import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  role: Role;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  avatar?: string;

  @ApiProperty({ minLength: 1, maxLength: 12 })
  @Length(1, 12)
  firstName: string;

  @ApiProperty({ maxLength: 12, required: false })
  @Length(0, 12)
  @IsOptional()
  lastName?: string;

  @ApiProperty({ maxLength: 300, required: false })
  @IsString()
  @Length(0, 300)
  @IsOptional()
  description?: string;

  @ApiProperty({ maxLength: 12, required: false })
  @IsString()
  @Length(0, 12)
  @IsOptional()
  phone?: string;

  @ApiProperty({ required: false })
  @IsUrl()
  @IsOptional()
  youtube?: string;

  @ApiProperty({ required: false })
  @IsUrl()
  @IsOptional()
  facebook?: string;

  @ApiProperty({ required: false })
  @IsUrl()
  @IsOptional()
  instagram?: string;

  @ApiProperty({ required: false })
  @IsUrl()
  @IsOptional()
  telegram?: string;

  @ApiProperty({ required: false })
  @IsUrl()
  @IsOptional()
  whatsapp?: string;

  @ApiProperty({ required: false })
  @IsUrl()
  @IsOptional()
  viber?: string;
}
