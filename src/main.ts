import dotenv from 'dotenv';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
import { GlobalResponseInterceptor } from './common/interceptor/global-response/global-response.interceptor';
import { HttpExceptionFilter } from './common/exceptions/http-exception/http-exception.filter';
import { DataAccessFilter } from './common/exceptions/data-access/data-access.filter';
import { DtoValidatePipe } from './common/pipe/dto-validate/dto-validate.pipe';
import { VersioningType } from '@nestjs/common';
import compression from 'compression';
import { AllExceptionFilter } from './common/exceptions/all-exception/all-exception.filter';

// NODE_ENV 变量 是通过 命令行设置的
dotenv.config({
  path: process.env.NODE_ENV === 'development' ? '.env.dev' : 'env.prod',
});

async function bootstrap() {
  // 异步加载AppModule 等待上面 env 配置文件加载完成
  const { AppModule } = await import('./app.module');
  const app = await NestFactory.create(AppModule, { logger: ['error'] });

  const { httpAdapter } = app.get(HttpAdapterHost);

  const { NODE_ENV, HOST, PORT, PREFIX } = process.env;

  // 开启 gzip 压缩
  app.use(compression());
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
  // 注册全局异常过滤器
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  // 注册全局DTO层校验管道
  app.useGlobalPipes(new DtoValidatePipe());

  // ctrl + c 强制关闭进程时 会触发该通知 便于触发 应用程序关闭的生命周期函数
  // process.on('SIGINT', async () => await app.close());

  await app.listen(PORT || 3000, () => {
    console.log(
      `服务运行在: http://${HOST}:${PORT || 3000}${PREFIX} --${NODE_ENV}`,
    );
  });
}
bootstrap();
