import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsStrongPassword,
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Role } from 'src/enums/role.enums';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Todos os campos precisam ser preenchidos' })
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Todos os campos precisam ser preenchidos' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Todos os campos precisam ser preenchidos' })
  @IsStrongPassword({
    minLength: 8,
  })
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Role)
  role: number;
}
