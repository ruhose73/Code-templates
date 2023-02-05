import { ApiProperty } from '@nestjs/swagger';

export class ResUserDto {
  @ApiProperty({ example: 'uuid.v4 id', description: `id пользователя` })
  id: string;

  @ApiProperty({ example: 'Misha', description: `Имя` })
  name: string;

  @ApiProperty({ example: 'mail@mail.mail', description: `Почта` })
  email: string;
}
