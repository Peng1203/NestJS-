import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalResponseInterceptor } from './common/interceptor/global-response/global-response.interceptor';
import { HttpExceptionFilter } from './common/exceptions/http-exception/http-exception.filter';
import { DataAccessFilter } from './common/exceptions/data-access/data-access.filter';
import { DtoValidatePipe } from './common/pipe/dto-validate/dto-validate-pipe';

const { NODE_ENV, HOST, PORT, PREFIX } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  // 开启跨域
  app.enableCors();
  // 接口预设 路径
  app.setGlobalPrefix(PREFIX);
  // 注册全局响应拦截器
  app.useGlobalInterceptors(new GlobalResponseInterceptor());
  // 注册全局HTTP异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 注册DAO层异常过滤器
  app.useGlobalFilters(new DataAccessFilter());
  // 注册全局DTO层校验管道
  app.useGlobalPipes(new DtoValidatePipe());

  await app.listen(PORT || 3000, () => {
    console.log(
      `服务运行在: http://${HOST}:${PORT || 3000}${PREFIX} --${NODE_ENV}`,
    );
  });
}
bootstrap();
