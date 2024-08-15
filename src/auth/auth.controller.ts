import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  //   @Post('register')
  //   register(@Body() dto) {}

  @Post('login')
  login(@Body() dto) {
    return this.authService.signIn(dto.email, dto.password);
  }

  //   @Get('refresh')
  //   refresh(@Body() dto) {}
}
