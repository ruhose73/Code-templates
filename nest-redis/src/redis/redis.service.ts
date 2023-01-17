import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';
import { setKeyValueDto } from './dto';

@Injectable()
export class RedisService {
  private client;
  private url: string = this.configService.get('config.redis.url');
  private readonly logger = new Logger(RedisService.name);

  constructor(private readonly configService: ConfigService) {
    this.client = createClient({
      url: this.url,
    });
    this.client.on('error', (err) =>
      this.logger.error(`REDIS CLIENT ERROR: ${err.message} `),
    );
    this.client.connect();
  }

  async set(dto: setKeyValueDto) {
    if (dto.ttl !== undefined) {
      await this.setKeyValueWithTTL(dto);
    } else {
      await this.setKeyValueWithoutTTL(dto);
    }
  }

  async get(key: string) {
    try {
      const value = await this.client.GET(key);
      return JSON.parse(value);
    } catch (e) {
      this.logger.error(`REDIS GET ERROR: ${e.message}`);
    }
  }

  async delete(key: string) {
    try {
      await this.client.DEL(key);
    } catch (e) {
      this.logger.error(`REDIS DEL ERROR: ${e.message}`);
    }
  }

  private async setKeyValueWithTTL(dto: setKeyValueDto) {
    try {
      await this.client.SETEX(dto.key, dto.ttl, JSON.stringify(dto.value));
    } catch (e) {
      this.logger.error(`REDIS SETEX ERROR: ${e.message}`);
    }
  }

  private async setKeyValueWithoutTTL(dto: setKeyValueDto) {
    try {
      await this.client.SET(dto.key, JSON.stringify(dto.value));
    } catch (e) {
      this.logger.error(`REDIS SET ERROR: ${e.message}`);
    }
  }
}
