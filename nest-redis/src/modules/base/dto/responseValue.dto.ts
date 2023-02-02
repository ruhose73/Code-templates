import { ApiProperty } from '@nestjs/swagger';

export class responseValueDto {
  @ApiProperty({ example: { data: 'value 1' }, description: `Значение` })
  value: string | number | object;
}
