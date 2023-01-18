import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BaseService } from './base.service';
import { ISetValue } from '../../interfaces';

@Controller()
export class BaseController {
  constructor(private readonly baseService: BaseService) {}

  @Post('/set')
  async setValue(@Body() dto: ISetValue): Promise<object> {
    return await this.baseService.setValue(dto);
  }

  @Get('/get/:key')
  async getValue(@Param('key') key: string): Promise<object> {
    return await this.baseService.getValue(key);
  }

  @Delete('/delete/:key')
  async deleteValue(@Param('key') key: string): Promise<void> {
    return await this.baseService.deleteValue(key);
  }
}
