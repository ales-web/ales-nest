import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { UserModule } from '@user/user.module';

@Module({
  controllers: [ShopsController],
  providers: [ShopsService],
  imports: [UserModule],
})
export class ShopsModule {}
