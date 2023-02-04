import { Module } from '@nestjs/common';
import { DbModule } from './modules/db/db.module';
import { BaseModule } from './modules/base/base.module';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './configs';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    DbModule,
    BaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
