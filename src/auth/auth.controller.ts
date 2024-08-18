import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { User } from '@prisma/client';
import { TokenDto } from './dto/token.dto';
import { UserDto } from '@user/dto/user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({
    type: UserDto,
    description: 'User created',
  })
  @UsePipes(new ValidationPipe())
  @Post('register')
  @ApiConflictResponse({ description: 'User already exists' })
  register(@Body() dto: RegisterDto): Promise<User> {
    return this.authService.register(dto);
  }

  @ApiOkResponse({
    type: TokenDto,
    description: 'Login successful',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @UsePipes(new ValidationPipe())
  @Post('login')
  login(@Body() dto: RegisterDto): Promise<TokenDto> {
    return this.authService.logIn(dto.email, dto.password);
  }

  // @Post('logout')
  // logOut(@Query() token) {
  //   this.authService.logOut();
  // }
}
