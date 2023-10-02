import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ForgetAuthDto } from './dto/forget-auth.dto';
import { ResetAuthDto } from './dto/reset-auth.dto';
import { UserService } from 'src/user/user.service';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Login do usuário' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async login(@Body() { email, password }: LoginAuthDto) {
    return this.authService.login(email, password);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registra usuário' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async register(@Body() body: RegisterAuthDto) {
    return this.authService.register(body);
  }

  @Post('forget')
  @ApiOperation({ summary: 'Envia email para recuperar a senha' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async forget(@Body() { email }: ForgetAuthDto) {
    return this.authService.forget(email);
  }

  @Post('reset')
  @ApiOperation({ summary: 'Resetar senha' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async reset(@Body() { password, token }: ResetAuthDto) {
    return this.authService.reset(password, token);
  }
}
