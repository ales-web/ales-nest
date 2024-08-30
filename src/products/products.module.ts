import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ShopsModule } from 'src/shops/shops.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [ShopsModule],
})
export class ProductsModule {}
