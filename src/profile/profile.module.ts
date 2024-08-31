import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { UsersModule } from '@user/users.module';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [UsersModule],
  exports: [ProfileService],
})
export class ProfileModule {}
