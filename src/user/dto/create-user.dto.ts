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

  @ApiProperty()
  @IsOptional()
  @IsEnum(Role)
  role: number;
}
