import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@user/user.module';
import { options } from './config';
import { PrismaService } from '@prisma/prisma.service';
import { PrismaModule } from '@prisma/prisma.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: 'verysecretcode',
      signOptions: { expiresIn: '3d' },
    }),
    UserModule,
  ],
})
export class AuthModule {}
