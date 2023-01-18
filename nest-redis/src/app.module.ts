import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './configs';
import { BaseModule } from './modules/base/base.module';
import { RedisModule } from './modules/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    BaseModule,
    RedisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
