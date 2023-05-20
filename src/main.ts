import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.enableCors({
    credentials: true,
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    origin: process.env.CORS_ORIGIN,
  });

  app.use(
    rateLimit({
      windowMs: 10 * 60 * 1000, // 10 minutes
      max: 100, // Limit each IP to 100 requests per `window` (here, per 10 minutes)
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
      /* 
      The counting will skip all successful requests and just count the errors. 
      Instead of removing rate-limiting, it's better to set this to true to limit the number of times a request fails.
      */
      skipSuccessfulRequests: false,
      message: { message: 'E_TOO_MANY_REQUESTS', statusCode: 403 },
    }),
  );

  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());

  const PORT = Number(process.env.PORT);

  if (Number.isNaN(PORT)) {
    throw new Error('PORT is not defined or invalid');
  }

  const config = new DocumentBuilder()
    .setTitle('NestJS app')
    .setDescription('Div. test task')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(4000);
}
bootstrap();
