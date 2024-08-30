import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '@user/user.module';
import { ProfileModule } from 'src/profile/profile.module';
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UserModule, ProfileModule],
})
export class AuthModule {}
