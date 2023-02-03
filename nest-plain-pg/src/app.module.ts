import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { BaseModule } from './base/base.module';

@Module({
  imports: [DbModule, BaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
