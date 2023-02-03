import { Global, Module } from '@nestjs/common';
import { Pool } from 'pg';
import { getPostgresConfig } from 'src/configs';
import { PG_CONNECTION } from './constants/db.constants';

const dbProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool(getPostgresConfig),
};

@Global()
@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
