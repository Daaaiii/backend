import { ApiProperty } from '@nestjs/swagger';
import {
  IsStrongPassword,
  IsEmail,
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
  })
  password: string;
}
