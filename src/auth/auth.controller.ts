import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto, RefreshDto, RegisterDto } from './dto';
import { SessionEntity } from './entities';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Register new user' })
  @ApiCreatedResponse({
    type: SessionEntity,
    description: 'Registred successful',
  })
  @ApiConflictResponse({ description: 'User already exists' })
  @UsePipes(ValidationPipe)
  @Post('register')
  register(@Body() dto: RegisterDto): Promise<SessionEntity> {
    return this.authService.register(dto);
  }

  @ApiOperation({ summary: 'Login existing user' })
  @ApiOkResponse({
    type: SessionEntity,
    description: 'Login successful',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @UsePipes(ValidationPipe)
  @HttpCode(200)
  @Post('login')
  login(@Body() dto: LoginDto): Promise<SessionEntity> {
    return this.authService.logIn(dto.email, dto.password);
  }

  @ApiOperation({ summary: 'Get new token' })
  @ApiOkResponse({
    type: SessionEntity,
    description: 'Refresh successful',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid token' })
  @UsePipes(ValidationPipe)
  @HttpCode(200)
  @Post('refresh')
  refresh(@Body() token: RefreshDto): Promise<SessionEntity> {
    return this.authService.refresh(token.refreshToken);
  }
}
