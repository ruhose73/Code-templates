import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { ISetValue } from '../../interfaces';
@Injectable()
export class BaseService {
  constructor(private redisService: RedisService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getValue(key: string): Promise<object> {
    return await this.redisService.get(key);
  }

  async setValue(dto: ISetValue): Promise<object> {
    await this.redisService.set({
      key: dto.key,
      value: dto.value,
      ttl: dto.ttl,
    });
    return await this.redisService.get(dto.key);
  }

  async deleteValue(key: string): Promise<void> {
    return await this.redisService.delete(key);
  }
}
