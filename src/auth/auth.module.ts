import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '@user/users.module';
import { ProfileModule } from 'src/profile/profile.module';
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule, ProfileModule],
})
export class AuthModule {}
