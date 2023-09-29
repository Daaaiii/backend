import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsString, IsStrongPassword } from 'class-validator';

export class ResetAuthDto {
  @ApiProperty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
  })
  password: string;

  @IsJWT()
  token: string;
}
