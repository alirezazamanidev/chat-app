import './configs/env.config'
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import SwaggerConfig from './configs/swagger.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common';
import { getGlobalFilters } from './common/exceptions';
import { ValidationPipeErorr } from './common/pipes';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());
  
  const httpAdapter = app.get(HttpAdapterHost);

  // exceptions
  app.useGlobalFilters(...getGlobalFilters(httpAdapter));
  app.useGlobalPipes(new ValidationPipeErorr());
  app.setGlobalPrefix('api');
  // swsgger config
  SwaggerConfig(app);
  // port application
  const {PORT}=process.env
  await app.listen(PORT,()=>{
    console.log(`server run > http://localhost:${PORT}/api`);
    console.log(`swagger run > http://localhost:${PORT}/swagger`);
    
  });
}
bootstrap();
