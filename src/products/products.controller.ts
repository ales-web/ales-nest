import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ReadProductDto } from './dto/read-product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Create product' })
  @ApiCreatedResponse({
    type: ReadProductDto,
    description: 'Created successfully',
  })
  @ApiNotFoundResponse({ description: 'Shop not found' })
  @UsePipes(ValidationPipe)
  @Post()
  async createProduct(@Body() body: UpdateProductDto): Promise<ReadProductDto> {
    return this.productsService.createProduct(body);
  }

  @ApiOperation({ summary: 'Get product' })
  @ApiOkResponse({ type: ReadProductDto })
  @ApiNotFoundResponse({ description: 'Product not found' })
  @Get(':id')
  async getProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReadProductDto> {
    return await this.productsService.getProduct(id);
  }

  @ApiOperation({ summary: 'Get products' })
  @ApiOkResponse({ type: ReadProductDto, isArray: true })
  @Get()
  async getProducts(): Promise<ReadProductDto[]> {
    return await this.productsService.getProducts();
  }

  @ApiOperation({ summary: 'Update product' })
  @ApiOkResponse({ type: ReadProductDto })
  @ApiNotFoundResponse({ description: 'Product not found' })
  @UsePipes(ValidationPipe)
  @Put(':id')
  async editProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductDto,
  ): Promise<ReadProductDto> {
    return await this.productsService.updateProduct(id, body);
  }

  @ApiOperation({ summary: 'Delete product' })
  @ApiOkResponse({ type: ReadProductDto })
  @ApiNotFoundResponse({ description: 'Product not found' })
  @Delete(':id')
  async deleteProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReadProductDto> {
    return this.productsService.deleteProduct(id);
  }
}
