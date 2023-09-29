import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class RegisterAuthDto extends PickType(CreateUserDto, [
  'name',
  'email',
  'password',
  'role',
]) {}
