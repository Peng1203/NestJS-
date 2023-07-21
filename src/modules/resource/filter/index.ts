import { ROOT_PATH } from '@/config/resource.config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Express, Request } from 'express';
import multer from 'multer';

// 磁盘存储引擎
const diskStorage = multer.diskStorage({
  // 保存目录
  destination(req: Request, file: Express.Multer.File, cb) {
    cb(null, ROOT_PATH);
  },
  // 文件名称
  filename: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, Date.now() + file.originalname); // 文件名使用原始文件名
  },
});

// 内存存储引擎 使用内存存储的情况下 会在file对象身上多出一个 buffer 属性
const memoryStorage = multer.memoryStorage();

export const options: MulterOptions = {
  // 存储目录
  dest: ROOT_PATH,
  // 选择存储引擎 存储到磁盘或者内存中
  storage: diskStorage,
  // storage: memoryStorage,
  // 限制上传文件的类型 和 大小
  limits: {
    // 限制文件上传大小 如果是上传多个文件 的话 是针对没一个文件的大小限制 而不是多个文件的大小综合限制
    fileSize: 1024 * 1024 * 2, // 1mb 以字节(b) 为单位
    // 限制文件上传数量
    files: 1,
    // 表示最大允许的请求头键值对数量。如果设置为一个数字，那么 Multer 将会限制解析的请求头键值对数量，超过这个数量的键值对将被忽略。这个属性通常用于控制请求头的大小，以防止恶意攻击或资源浪费
    headerPairs: 2000,
    //  这个属性用于控制解析多部分表单数据时可以同时处理的最大部分数量。默认值为 Infinity，表示没有限制，可以同时处理任意数量的部分。如果设置为一个数字，那么 Multer 将会限制解析的部分数量，超过这个数量的部分将被忽略。这个属性通常用于控制表单数据的数量，以防止恶意攻击或资源浪费
    parts: 10,
  },
};
