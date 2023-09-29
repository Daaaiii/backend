import {
  IsEmail,
  IsStrongPassword,
  MinLength,
  minLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
export class LoginAuthDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword({
    minLength: 8,
  })
  password: string;
}
