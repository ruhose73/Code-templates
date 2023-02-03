import { Global, Module } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from './constants/db.constants';

const dbProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'somedb',
    password: '123456789',
    port: 5432,
  }),
};

@Global()
@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
