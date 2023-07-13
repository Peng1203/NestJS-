import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeORMConfig } from './config/mysql.config';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    // 导入配置env配置文件
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      cache: true,
    }),
    // 导入TypeORM
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: Number(process.env.DB_PORT),
      username:
        process.env.NODE_ENV === 'development'
          ? process.env.DB_USER_NAME_DEV
          : process.env.DB_USER_NAME_PROD,
      password:
        process.env.NODE_ENV === 'development'
          ? process.env.DB_PASSWORD_DEV
          : process.env.DB_PASSWORD_PROD,
      database: process.env.DB_NAME,
      // 设置时区
      timezone: '+08:00',
      // entities: [User],
      // entities: ['./dist/**/*.entity{.ts,.js}'],
      // entities: [__dirname + '/**/*.entity{.ts,.js}'], // 指定实体文件
      autoLoadEntities: true, // 自动加载实体文件
      synchronize: process.env.NODE_ENV === 'development' ? true : false, // 自动同步 生产环境不建议使用
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
