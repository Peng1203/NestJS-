import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
// import { APP_INTERCEPTOR } from '@nestjs/core';
// import { GlobalResponseInterceptor } from './common/interceptor/global-response.interceptor';

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
        await import('./config/mysql.config').then(
          ({ TypeORMConfig }) => TypeORMConfig,
        ),
    }),
    UserModule,
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
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
