import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { options } from '@auth/config';
import { ShopsModule } from './shops/shops.module';
import { ProfileModule } from './profile/profile.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync(options()),
    ShopsModule,
    ProfileModule,
    ProductsModule,
  ],
  controllers: [],
  exports: [JwtModule],
})
export class AppModule {}
