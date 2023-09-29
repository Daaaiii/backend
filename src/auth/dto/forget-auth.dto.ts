import { PickType } from '@nestjs/swagger';
import { LoginAuthDto } from './login-auth.dto';

export class ForgetAuthDto extends PickType(LoginAuthDto, ['email']) {}
