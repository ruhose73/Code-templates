import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Delete,
  Put,
  Param,
} from '@nestjs/common';
import { BaseService } from './base.service';
import {
  CreateUserDto,
  GetAllUsersQueryDto,
  ResUserDto,
  UpdateUserDto,
} from './dto';

@Controller()
export class BaseController {
  constructor(private readonly appService: BaseService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<ResUserDto> {
    return await this.appService.createUser(dto);
  }

  @Get()
  async getAllUsers(@Query() dto: GetAllUsersQueryDto): Promise<ResUserDto[]> {
    return await this.appService.getAllUsers({
      limit: dto.limit ? dto.limit : 25,
      offset: dto.offset ? dto.offset : 0,
    });
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<ResUserDto> {
    return await this.appService.getUserById(id);
  }

  @Delete('/:id')
  async deleteUserById(@Param('id') id: string): Promise<void> {
    return await this.appService.deleteUserById(id);
  }

  @Put('/:id')
  async updateUserById(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<ResUserDto> {
    return await this.appService.updateUserById(id, dto);
  }
}
