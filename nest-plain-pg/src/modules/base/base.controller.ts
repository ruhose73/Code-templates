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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BaseService } from './base.service';
import {
  CreateUserDto,
  GetAllUsersQueryDto,
  ResUserDto,
  UpdateUserDto,
} from './dto';

@ApiTags(`Redis`)
@Controller()
export class BaseController {
  constructor(private readonly appService: BaseService) {}

  @ApiOperation({ summary: `Создание пользователя` })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, type: ResUserDto })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<ResUserDto> {
    return await this.appService.createUser(dto);
  }

  @ApiOperation({ summary: `Получение всех пользователей` })
  @ApiQuery({
    name: 'limit',
    description: 'limit',
  })
  @ApiQuery({
    name: 'offset',
    description: 'offset',
  })
  @ApiResponse({ status: 200, type: [ResUserDto] })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Get()
  async getAllUsers(@Query() dto: GetAllUsersQueryDto): Promise<ResUserDto[]> {
    return await this.appService.getAllUsers({
      limit: dto.limit ? dto.limit : 25,
      offset: dto.offset ? dto.offset : 0,
    });
  }

  @ApiOperation({ summary: `Получение пользователя по id` })
  @ApiParam({
    name: 'id',
    description: 'Id пользователя',
  })
  @ApiResponse({ status: 200, type: ResUserDto })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<ResUserDto> {
    return await this.appService.getUserById(id);
  }

  @ApiOperation({ summary: `Удаление пользователя по id` })
  @ApiParam({
    name: 'id',
    description: 'Id пользователя',
  })
  @ApiResponse({ status: 200, description: `OK` })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Delete('/:id')
  async deleteUserById(@Param('id') id: string): Promise<void> {
    return await this.appService.deleteUserById(id);
  }

  @ApiOperation({ summary: `Обновление пользователя` })
  @ApiParam({
    name: 'id',
    description: 'Id пользователя',
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 201, type: ResUserDto })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Put('/:id')
  async updateUserById(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<ResUserDto> {
    return await this.appService.updateUserById(id, dto);
  }
}
