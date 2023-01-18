# NEST REDIS

### Описание

Простой модуль для работы с redis.  
Данный модуль позволяет устанавливать различные значения с различным TTL (и без него тоже)

### Пример использования

Module

```ts
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
```

Service

```ts
import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { ISetValue } from '../../interfaces';
@Injectable()
export class BaseService {
  constructor(private redisService: RedisService) {}

  //get value by key
  async getValue(key: string): Promise<object> {
    return await this.redisService.get(key);
  }

  //set key value
  async setValue(dto: ISetValue): Promise<object> {
    await this.redisService.set({
      key: dto.key,
      value: dto.value,
      ttl: dto.ttl,
    });
    return await this.redisService.get(dto.key);
  }

  //delete value by key
  async deleteValue(key: string): Promise<void> {
    return await this.redisService.delete(key);
  }
}
```

Interface

```ts
export interface ISetValue {
  key: string;
  value: object | string;
  ttl?: number;
}
```

### Установка и запуск

* Скачайте репозиторий
* В папке репозитория выполните команду в терминале `npm install`
* В файле `.env` установите свои значения для `REDIS_HOST` и `REDIS_PORT`
* Затем выполните команду `npm run start:dev`
* При необходимости может меняться `app.config.ts` в папке `src\configs\app.config.ts`
