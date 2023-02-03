import { Module } from '@nestjs/common';
import { DbModule } from './modules/db/db.module';
import { BaseModule } from './modules/base/base.module';
@Module({
  imports: [DbModule, BaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
