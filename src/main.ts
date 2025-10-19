import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ValidationPipe,
  LogLevel,
  Logger,
  VersioningType,
} from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const logLevel: LogLevel[] = ['error', 'warn', 'fatal', 'log'];

  if (process.env.NODE_ENV === 'dev') {
    logLevel.push('debug', 'verbose');
  }

  const app = await NestFactory.create(AppModule, { logger: logLevel });

  const config = new DocumentBuilder()
    .setTitle('LM Robotica Backend')
    .setDescription('LM Robotica API')
    .setVersion('2.0')
    .addTag('node')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();

  app.setGlobalPrefix('api/v2');

  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: process.env.NODE_ENV === 'dev',
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);

  console.log(`App running on port ${process.env.PORT}`);
}
bootstrap();
