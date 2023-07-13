import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import MySqlConfig from './config/mysql.config';
import { User } from './modules/users/entities/user.entity';
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
      // entities: [User],
      // entities: ['./dist/**/*.entity{.ts,.js}'],
      // entities: [__dirname + '/**/*.entity{.ts,.js}'], // 指定实体文件
      synchronize: true, // 自动同步 生产环境不建议使用
      autoLoadEntities: true, // 自动加载实体文件
      ...MySqlConfig,
      // 设置时区
      timezone: '+08:00',
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
