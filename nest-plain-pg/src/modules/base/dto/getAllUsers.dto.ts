import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator/types/decorator/decorators';

export class GetAllUsersQueryDto {
  @ApiProperty({ example: 100, description: `limit` })
  @Type(() => Number)
  @IsInt()
  limit?: number;

  @ApiProperty({ example: 25, description: `offset` })
  @Type(() => Number)
  @IsInt()
  offset?: number;
}
