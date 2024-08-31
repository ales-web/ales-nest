import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { UsersModule } from '@user/users.module';

@Module({
  controllers: [ShopsController],
  providers: [ShopsService],
  imports: [UsersModule],
  exports: [ShopsService],
})
export class ShopsModule {}
