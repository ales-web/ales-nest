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
import { User } from '@prisma/client';
import { UserDto } from '@user/dto/user.dto';
import { LoginDto, RefreshDto, RegisterDto, TokenDto } from './dto';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Register new user' })
  @ApiCreatedResponse({
    type: UserDto,
    description: 'Registred successful',
  })
  @ApiConflictResponse({ description: 'User already exists' })
  @UsePipes(ValidationPipe)
  @Post('register')
  register(@Body() dto: RegisterDto): Promise<User> {
    return this.authService.register(dto);
  }

  @ApiOperation({ summary: 'Login existing user' })
  @ApiOkResponse({
    type: LoginDto,
    description: 'Login successful',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @UsePipes(ValidationPipe)
  @HttpCode(200)
  @Post('login')
  login(@Body() dto: RegisterDto): Promise<LoginDto> {
    return this.authService.logIn(dto.email, dto.password);
  }

  @ApiOperation({ summary: 'Get new token' })
  @ApiOkResponse({
    type: TokenDto,
    description: 'Refresh successful',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid token' })
  @UsePipes(ValidationPipe)
  @HttpCode(200)
  @Post('refresh')
  refresh(@Body() token: RefreshDto): Promise<TokenDto> {
    return this.authService.refresh(token.refreshToken);
  }
  // @Post('logout')
  // logOut(@Query() token) {
  //   this.authService.logOut();
  // }
}
