interface IPgConfig {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
}

export const getPostgresConfig: IPgConfig = {
  user: 'postgres',
  host: 'postgres',
  database: 'somedb',
  password: '123456789',
  port: 5432,
};
