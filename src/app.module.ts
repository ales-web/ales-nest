import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { options } from '@auth/config';
import { ShopsModule } from './shops/shops.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync(options()),
    ShopsModule,
    ProfileModule,
  ],
  controllers: [],
  exports: [JwtModule],
})
export class AppModule {}
