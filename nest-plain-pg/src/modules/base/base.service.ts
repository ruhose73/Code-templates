import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from '../db/constants/db.constants';
import {
  CreateUserDto,
  GetAllUsersQueryDto,
  ResUserDto,
  UpdateUserDto,
} from './dto';
import {
  checkUser,
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from './sql';

@Injectable()
export class BaseService {
  constructor(@Inject(PG_CONNECTION) private pg: any) {}

  async createUser(dto: CreateUserDto): Promise<ResUserDto> {
    const { rowCount, rows } = await this.pg.query(createUser(dto));
    if (rowCount === 0) {
      throw new BadRequestException(`Логин или имя уже заняты`);
    }
    return rows[0];
  }

  async getAllUsers(dto: GetAllUsersQueryDto): Promise<ResUserDto[]> {
    return (await this.pg.query(getAllUsers, [dto.limit, dto.offset])).rows;
  }

  async getUserById(id: string): Promise<ResUserDto> {
    return (await this.pg.query(getUserById, [id])).rows[0];
  }

  async deleteUserById(id: string): Promise<void> {
    await this.pg.query(deleteUserById, [id]);
  }

  async updateUserById(id: string, dto: UpdateUserDto): Promise<ResUserDto> {
    const { rows } = await this.pg.query(checkUser, [dto.name, dto.email, id]);
    if (rows[0].count != 0) {
      throw new BadRequestException(`Логин или имя уже заняты`);
    }
    const updateUser = await this.pg.query(updateUserById, [
      id,
      dto.name,
      dto.password,
      dto.email,
    ]);
    return updateUser.rows[0];
  }
}
