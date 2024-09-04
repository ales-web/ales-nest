import { ApiProperty } from '@nestjs/swagger';
import {
  ProductCategories,
  ProductColors,
  ProductMaterials,
  ProductTag,
} from '@prisma/client';
import { IsArray, IsEnum, IsInt, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  price: number;

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

  @ApiProperty({ enum: ProductMaterials, isArray: true })
  @IsEnum(ProductMaterials, { each: true })
  materials: ProductMaterials[];

  @ApiProperty({ enum: ProductColors, isArray: true })
  @IsEnum(ProductColors, { each: true })
  colors: ProductColors[];

  @ApiProperty()
  @IsNumber()
  size: number;

  @ApiProperty({ enum: ProductCategories })
  @IsEnum(ProductCategories)
  category: ProductCategories;

  @ApiProperty()
  @IsInt()
  inStock: number;
}
