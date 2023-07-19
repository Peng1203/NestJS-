import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
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
      retryAttempts: 10, // 最大重连次数
      retryDelay: 5000, // 重连间隔 ms
      // entities: [User],
      // entities: ['./dist/**/*.entity{.ts,.js}'],
      // entities: [__dirname + '/**/*.entity{.ts,.js}'], // 指定实体文件
      autoLoadEntities: true, // 自动加载实体文件
      synchronize: process.env.NODE_ENV === 'development' ? true : false, // 自动同步 生产环境不建议使用
    };
  }
}
