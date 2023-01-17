import { Module } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Module({
  imports: [],
  controllers: [],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
