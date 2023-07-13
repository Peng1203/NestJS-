import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const { NODE_ENV, HOST, PORT, PREFIX } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(PREFIX);

  await app.listen(PORT || 3000, () => {
    console.log('NODE_ENV -----> ', NODE_ENV);
    console.log(`服务运行在: http://${HOST}:${PORT || 3000}${PREFIX}`);
  });
}
bootstrap();
