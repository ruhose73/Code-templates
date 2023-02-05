import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'Misha', description: `Имя` })
  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  name: string;

  @ApiProperty({ example: 'Password', description: `Пароль` })
  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  password: string;

  @ApiProperty({ example: 'Mail@mail.mail', description: `Почта` })
  @IsNotEmpty()
  @IsEmail()
  @Type(() => String)
  @IsString()
  email: string;
}
