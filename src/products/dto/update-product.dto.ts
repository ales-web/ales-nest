import { ApiProperty } from '@nestjs/swagger';
import { ProductTag } from '@prisma/client';
import { IsArray, IsEnum, IsInt, IsString } from 'class-validator';

export class UpdateProductDto {
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
}
