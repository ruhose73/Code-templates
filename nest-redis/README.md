# NEST REDIS

### Описание

Простой модуль для работы с redis.  
Данный модуль позволяет устанавливать различные значения с различным TTL (и без него тоже)

### Установка и запуск без Docker

* Скачайте репозиторий
* В папке репозитория выполните команду в терминале `npm install`
* В файле `.env` установите свои значения для `REDIS_HOST` и `REDIS_PORT`
* Затем выполните команду `npm run start:dev`
* При необходимости может меняться `app.config.ts` в папке `src\configs\app.config.ts`

### Установка и запуск внутри Docker

* Скачайте репозиторий
* В файле `.env` установите значения `REDIS_HOST=redis` и `REDIS_PORT=6379`.
* В папке репозитория выполните команду в терминале `docker compose -f "docker-compose.yml" up -d --build`

### Тесты

* Скачайте репозиторий
* В папке репозитория выполните команду в терминале `npm run test`

### Документация

<http://localhost:8080/docs#/>

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
import { SetValueDTO } from './dto';

@Injectable()
export class BaseService {
  constructor(private redisService: RedisService) {}

  //get value by key
  async getValue(key: string): Promise<object> {
    return await this.redisService.get(key);
  }

  //set key value
  async setValue(dto: SetValueDTO): Promise<object> {
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

DTO

```ts
export class SetValueDTO {
  key: string;
  value: object | string | number;
  ttl?: number;
}
```

```ts
export class responseValueDto {
  value: string | number | object;
}
```
