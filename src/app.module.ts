import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/user.module';
import { RolesModule } from './modules/roles/roles.module';
// import { APP_INTERCEPTOR } from '@nestjs/core';
// import { GlobalResponseInterceptor } from './common/interceptor/global-response.interceptor';
import LoggerMiddleware from './common/middleware/logger/logger.middleware';

@Module({
  imports: [
    // 导入配置env配置文件
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      cache: true,
    }),
    // 异步加载的方式 导入TypeORM 配置
    TypeOrmModule.forRootAsync({
      useFactory: async (): Promise<TypeOrmModuleOptions> =>
        await import('./config/typeORM.config').then(
          ({ TypeORMConfig }) => TypeORMConfig,
        ),
    }),
    UsersModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 注册全局 响应拦截器
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: GlobalResponseInterceptor,
    // },
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
