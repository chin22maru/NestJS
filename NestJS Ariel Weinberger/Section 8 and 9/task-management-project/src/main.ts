import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';

const PORT = process.env.PORT ?? 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger()
  app.useGlobalPipes(new ValidationPipe)
  app.useGlobalInterceptors(new TransformInterceptor)
  await app.listen(PORT);

  logger.log(`Application listening on port ${PORT}`)
}
bootstrap();
