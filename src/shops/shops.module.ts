import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { UserService } from '@user/user.service';

@Module({
  controllers: [ShopsController],
  providers: [ShopsService],
})
export class ShopsModule {}
