import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalResponseInterceptor } from './common/interceptor/global-response.interceptor';

const { NODE_ENV, HOST, PORT, PREFIX } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  app.setGlobalPrefix(PREFIX);
  // 注册全局响应拦截器
  app.useGlobalInterceptors(new GlobalResponseInterceptor());
  await app.listen(PORT || 3000, () => {
    console.log(
      `服务运行在: http://${HOST}:${PORT || 3000}${PREFIX} --${NODE_ENV}`,
    );
  });
}
bootstrap();
