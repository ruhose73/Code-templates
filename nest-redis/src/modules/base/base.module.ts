import { Module } from '@nestjs/common';
import { RedisModule } from '../redis/redis.module';
import { BaseController } from './base.controller';
import { BaseService } from './base.service';

@Module({
  imports: [RedisModule],
  controllers: [BaseController],
  providers: [BaseService],
})
export class BaseModule {}
