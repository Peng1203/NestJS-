import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleDestroy,
  OnModuleInit,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/user.module';
import { RolesModule } from './modules/roles/roles.module';
import { JobsModule } from './modules/jobs/jobs.module';
// import { APP_INTERCEPTOR } from '@nestjs/core';
// import { GlobalResponseInterceptor } from './common/interceptor/global-response.interceptor';
import LoggerMiddleware from './common/middleware/logger/logger.middleware';
import { TypeOrmConfigService } from './config/typeORM.init';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './schedule';
import { BullModule } from '@nestjs/bull';
import { QueneModule } from './modules/quene/quene.module';
import { ResourceModule } from './modules/resource/resource.module';

@Module({
  imports: [
    // 导入配置env配置文件
    ConfigModule.forRoot({
      envFilePath: [
        '.env',
        // process.env.NODE_ENV === 'development' ? '.env.dev' : '.env.prod',
      ],
      isGlobal: true,
      cache: true,
    }),
    // 异步加载的方式 导入TypeORM 配置
    TypeOrmModule.forRootAsync({
      /* 使用工厂函数的方式异步加载 
      // useFactory: async (): Promise<TypeOrmModuleOptions> =>
      //   await import('./config/typeORM.config').then(
      //     ({ TypeORMConfig }) => TypeORMConfig,
      //   ),
      
      /* 使用 useClass 的方法加载配置 */
      useClass: TypeOrmConfigService,
    }),
    // 注册定时任务
    ScheduleModule.forRoot(),
    UsersModule,
    RolesModule,
    JobsModule,
    QueneModule,
    ResourceModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 引入定时任务服务类
    TasksService,
    // 注册全局 响应拦截器
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: GlobalResponseInterceptor,
    // },
  ],
})
export class AppModule implements NestModule, OnModuleInit, OnModuleDestroy {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }

  onModuleInit() {
    console.log(' -----> Nestjs 启动!');
  }

  onModuleDestroy() {
    console.log(' -----> Nestjs 关闭!');
  }
}
