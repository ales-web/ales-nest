import { ApiProperty } from '@nestjs/swagger';
import { ProductTag } from '@prisma/client';

export class ReadProductDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  images: string[];

  @ApiProperty({ enum: ProductTag, isArray: true })
  tags: ProductTag[];

  @ApiProperty()
  shopId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
