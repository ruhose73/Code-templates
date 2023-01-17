import { registerAs } from '@nestjs/config';

interface IAppConfig {
  nodeEnv: string;
  server: {
    port: number;
    host: string;
  };
  postgres: {
    postgresHost: string;
    postgresPort: number;
    postgresUser: string;
    postgresPassword: string;
    postgresDatabase: string;
  };
  jwt: {
    jwtSecret: string;
    jwtExpiresIn: string;
  };
  redis: {
    host: string;
    port: number;
    url: string;
  };
  healthCheck: {
    warningDisckCapacity: number;
    warningHeapCapacity: number;
    warningRSSCapacity: number;
  };
}

//добавить валидатор
export default registerAs(
  'config',
  (): IAppConfig => ({
    nodeEnv: process.env.NODE_ENV || 'development',
    server: {
      port: parseInt(process.env.SERVER_PORT, 10) || 8080,
      host: process.env.SERVER_HOST || '127.0.0.1',
    },
    postgres: {
      postgresHost: process.env.POSTGRES_HOST,
      postgresPort: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      postgresUser: process.env.POSTGRES_USER,
      postgresPassword: process.env.POSTGRES_PASSWORD,
      postgresDatabase: process.env.POSTGRES_DATABASE,
    },
    jwt: {
      jwtSecret: process.env.JWT_SECRET,
      jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT) || 6379,
      url: `redis://${process.env.REDIS_HOST}:${
        parseInt(process.env.REDIS_PORT) || 6379
      }`,
    },
    healthCheck: {
      warningDisckCapacity:
        parseInt(process.env.HEALTH_CHECK_DISK_WARNING_CAPACITY) || 250,
      warningHeapCapacity:
        parseInt(process.env.HEALTH_CHECK_HEAP_WARNING_CAPACITY) || 300,
      warningRSSCapacity:
        parseInt(process.env.HEALTH_CHECK_RSS_WARNING_CAPACITY) || 300,
    },
  }),
);
