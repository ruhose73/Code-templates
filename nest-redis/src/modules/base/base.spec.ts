import { Test } from '@nestjs/testing';
import { BaseController } from './base.controller';
import { BaseService } from './base.service';
import { RedisService } from '../redis/redis.service';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ConfigService } from '@nestjs/config';

describe('TEST NEST-REDIS', () => {
  let app: INestApplication;
  let baseService;

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const values = {
    key: 'key1',
    value: 'value1',
    ttl: 3,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [BaseService, ConfigService, RedisService],
      controllers: [BaseController],
    })
      .overrideProvider(BaseService)
      .useValue(baseService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  // Ставим значение с TTL
  it(`SET VALUE WITH TTL`, () => {
    return request(app.getHttpServer())
      .post('/set')
      .send({ key: values.key, value: values.value, ttl: 3 })
      .expect(201)
      .expect({ value: values.value });
  });

  // Получаем пустой значение изза истекщего TTL
  it(`GET VALUE WITH EXPECTED TTL`, async () => {
    await delay(5000);
    return request(app.getHttpServer())
      .get(`/get/${values.key}`)
      .expect(200)
      .expect({ value: null });
  }, 10000);

  // Ставим новое значение без TTL
  it(`SET VALUE WITHOUT TTL`, () => {
    return request(app.getHttpServer())
      .post('/set')
      .send({ key: values.key, value: values.value })
      .expect(201)
      .expect({ value: values.value });
  });

  // Получаем значение
  it(`GET VALUE WITHOUT TTL`, async () => {
    return request(app.getHttpServer())
      .get(`/get/${values.key}`)
      .expect(200)
      .expect({ value: values.value });
  });

  // Удаляем значение
  it(`DELETE VALUE`, async () => {
    return request(app.getHttpServer())
      .delete(`/delete/${values.key}`)
      .expect(200);
  });

  // Проверяем удаление
  it(`GET VALUE AFTER DELETE`, async () => {
    return request(app.getHttpServer())
      .get(`/get/${values.key}`)
      .expect(200)
      .expect({ value: null });
  });

  afterAll(async () => {
    await app.close();
  });
});
