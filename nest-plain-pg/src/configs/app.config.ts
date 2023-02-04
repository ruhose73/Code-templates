import { registerAs } from '@nestjs/config';

interface IAppConfig {
  nodeEnv: string;
  server: {
    port: number;
    host: string;
    api: string;
  };
  postgres: {
    user: string;
    host: string;
    database: string;
    password: string;
    port: number;
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
    postgres: {
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST || '127.0.0.1',
      database: process.env.POSTGRES_DATABASE,
      password: process.env.POSTGRES_PASSWORD,
      port: parseInt(process.env.POSTGRES_PORT) || 5432,
    },
  }),
);
