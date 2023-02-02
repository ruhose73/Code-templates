import { Global, Module } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
