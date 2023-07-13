import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const {
  NODE_ENV,
  HOST,
  DB_PORT,
  DB_NAME,
  DB_USER_NAME_DEV,
  DB_PASSWORD_DEV,
  DB_USER_NAME_PROD,
  DB_PASSWORD_PROD,
} = process.env;
export const TypeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: HOST,
  port: Number(DB_PORT),
  username: NODE_ENV === 'development' ? DB_USER_NAME_DEV : DB_USER_NAME_PROD,
  password: NODE_ENV === 'development' ? DB_PASSWORD_DEV : DB_PASSWORD_PROD,
  database: DB_NAME,
  // 设置时区
  timezone: '+08:00',
  // entities: [User],
  // entities: ['./dist/**/*.entity{.ts,.js}'],
  // entities: [__dirname + '/**/*.entity{.ts,.js}'], // 指定实体文件
  autoLoadEntities: true, // 自动加载实体文件
  synchronize: NODE_ENV === 'development' ? true : false, // 自动同步 生产环境不建议使用
};
