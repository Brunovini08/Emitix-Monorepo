import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { HttpExceptionFilter } from './shared/common/filters/http-exeception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://89.116.74.203:3032',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true }));
  app.use(cookieParser());
  app.use(helmet());

  app.enableShutdownHooks()
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      validationError: {
        target: false,
        value: false,
      },
    }),
  );
  dotenv.config();
  const config = new DocumentBuilder()
    .setTitle('Emitix')
    .setDescription(
      'API para trazer facilidade ao seu serviço com facil integração ao seu projeto',
    )
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  
  await app.listen(3030);
}
void bootstrap();
