import './configs/env.config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.setGlobalPrefix('/api');
  // port application
  const {PORT}=process.env
  await app.listen(PORT,()=>{
    console.log(`sever run > http://localhost:${PORT}/api`);
    
  });
}
bootstrap();
