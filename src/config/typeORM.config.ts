import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const { HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
console.log(
  'TypeORMConfig ----->',
  HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
);
export const TypeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
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
