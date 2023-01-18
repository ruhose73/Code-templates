import { registerAs } from '@nestjs/config';

interface IAppConfig {
  nodeEnv: string;
  server: {
    port: number;
    host: string;
    api: string;
  };
  redis: {
    host: string;
    port: number;
    url: string;
  };
}

export default registerAs(
  'config',
  (): IAppConfig => ({
    nodeEnv: process.env.NODE_ENV || 'development',
    server: {
      port: parseInt(process.env.SERVER_PORT, 10) || 8080,
      host: process.env.SERVER_HOST || '127.0.0.1',
      api: process.env.API_URL,
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT) || 6379,
      url: `redis://${process.env.REDIS_HOST}:${
        parseInt(process.env.REDIS_PORT) || 6379
      }`,
    },
  }),
);
