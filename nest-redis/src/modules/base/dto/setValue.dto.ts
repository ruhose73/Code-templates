import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class SetValueDTO {
  @ApiProperty({ example: 'key 1', description: `Ключ` })
  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  key: string;

  @ApiProperty({ example: { data: 'value 1' }, description: `Значение` })
  @IsNotEmpty()
  value: object | string | number;

  @ApiProperty({
    example: 1000,
    description: 'TTL в секундах',
    required: false,
  })
  @Type(() => Number)
  ttl?: number;
}
