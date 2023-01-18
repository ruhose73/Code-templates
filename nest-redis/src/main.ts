import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({ credentials: true, origin: true });
  app.setGlobalPrefix('api/redis');
  await app.listen(configService.get('config.server.port'), () => {
    console.log(`BASE URL: ${configService.get('config.server.api')}`);
    console.log(`PORT: ${configService.get('config.server.port')}`);
  });
}
bootstrap();
