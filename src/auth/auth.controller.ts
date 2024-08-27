import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserDto } from '@user/dto/user.dto';
import { LoginDto, RegisterDto, TokenDto } from './dto';
import { AuthGuard } from './auth.guard';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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

  @ApiBearerAuth()
  @ApiOkResponse({
    type: TokenDto,
    description: 'Refresh successful',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid token' })
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  @HttpCode(200)
  @Post('refresh')
  async refresh(@Req() request: Request): Promise<TokenDto> {
    const token = request.headers['authorization'].split(' ')[1];
    return this.authService.refresh(token);
  }
  // @Post('logout')
  // logOut(@Query() token) {
  //   this.authService.logOut();
  // }
}
