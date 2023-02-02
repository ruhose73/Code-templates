import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BaseService } from './base.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { responseValueDto, SetValueDTO } from './dto';

@ApiTags(`Redis`)
@Controller()
export class BaseController {
  constructor(private readonly baseService: BaseService) {}

  @ApiOperation({ summary: `Установка значения` })
  @ApiBody({ type: SetValueDTO })
  @ApiResponse({ status: 201, type: responseValueDto })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Post('/set')
  async setValue(@Body() dto: SetValueDTO): Promise<object> {
    return await this.baseService.setValue(dto);
  }

  @ApiOperation({ summary: `Получение значения` })
  @ApiParam({
    name: 'key',
    description: 'Ключ значения в Redis',
  })
  @ApiResponse({ status: 201, type: responseValueDto })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Get('/get/:key')
  async getValue(@Param('key') key: string): Promise<object> {
    return await this.baseService.getValue(key);
  }

  @ApiOperation({ summary: `Удаление` })
  @ApiParam({
    name: 'key',
    description: 'Ключ значения в Redis',
  })
  @ApiResponse({ status: 201, description: `OK` })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Delete('/delete/:key')
  async deleteValue(@Param('key') key: string): Promise<void> {
    return await this.baseService.deleteValue(key);
  }
}
