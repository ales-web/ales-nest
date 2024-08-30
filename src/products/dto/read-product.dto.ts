import { ApiProperty } from '@nestjs/swagger';
import { ProductTag } from '@prisma/client';
import { IsArray, IsDate, IsEnum, IsInt, IsString } from 'class-validator';

export class ReadProductDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsArray()
  images: string[];

  @ApiProperty({ enum: ProductTag, isArray: true })
  @IsEnum(ProductTag, { each: true })
  tags: ProductTag[];

  @ApiProperty()
  @IsInt()
  shopId: number;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}
