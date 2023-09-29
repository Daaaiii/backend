import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { ForgetAuthDto } from './dto/forget-auth.dto';
import { ResetAuthDto } from './dto/reset-auth.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiTags('auth')
  @Post('login')
  async login(@Body() { email, password }: LoginAuthDto) {
    return this.authService.login(email, password);
  }

  @ApiTags('auth')
  @Post('register')
  async register(@Body() body: RegisterAuthDto) {
    return this.authService.register(body);
  }

  @ApiTags('auth')
  @Post('forget')
  async forget(@Body() { email }: ForgetAuthDto) {
    return this.authService.forget(email);
  }

  @ApiTags('auth')
  @Post('reset')
  async reset(@Body() { password, token }: ResetAuthDto) {
    return this.authService.reset(password, token);
  }
}
