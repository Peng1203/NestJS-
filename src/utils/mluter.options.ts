import { ROOT_PATH } from '@/config/resource.config';
import {
  ApplicationTypes,
  AudioMimeTypes,
  ImgMimeTypes,
  VideoMimeTypes,
} from '@/helper/enums';
import { BadRequestException } from '@nestjs/common';
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

type saveType = 'disk' | 'RAM';

type MimeType = 'img' | 'video' | 'audio' | 'application' | 'custom';

const MimeTypeMapping = {
  img: ImgMimeTypes,
  video: VideoMimeTypes,
  audio: AudioMimeTypes,
  application: ApplicationTypes,
};

/**
 * multer 配置项
 * @author Peng
 * @date 2023-07-21
 * @param {any} size:文件大小
 * @param {any} fileNumber:最大上传数量
 * @param {saveType} toSave:存储位置
 * @param {MimeType} mimeType:文件类型
 * @returns {MulterOptions}
 */
export function multerOptions(
  size: number = 1,
  fileNumber: number = 1,
  toSave: saveType = 'disk',
  mimeType: MimeType = 'img',
): MulterOptions {
  return {
    // 存储目录
    dest: ROOT_PATH,
    // 选择存储引擎 存储到磁盘或者内存中
    storage: toSave === 'disk' ? diskStorage : memoryStorage,
    // storage: memoryStorage,
    // 限制上传文件的类型 和 大小
    limits: {
      // 限制文件上传大小 如果是上传多个文件 的话 是针对没一个文件的大小限制 而不是多个文件的大小综合限制
      fileSize: 1024 * 1024 * size, // 1mb 以字节(b) 为单位
      // 限制文件上传数量
      files: fileNumber,
      // 表示最大允许的请求头键值对数量。如果设置为一个数字，那么 Multer 将会限制解析的请求头键值对数量，超过这个数量的键值对将被忽略。这个属性通常用于控制请求头的大小，以防止恶意攻击或资源浪费
      headerPairs: 2000,
      //  这个属性用于控制解析多部分表单数据时可以同时处理的最大部分数量。默认值为 Infinity，表示没有限制，可以同时处理任意数量的部分。如果设置为一个数字，那么 Multer 将会限制解析的部分数量，超过这个数量的部分将被忽略。这个属性通常用于控制表单数据的数量，以防止恶意攻击或资源浪费
      parts: 10,
    },
    // 限制文件上传类型 当存储多个文件时 每个文件都会执行对应的该函数
    fileFilter(
      req: Request,
      file: Express.Multer.File,
      // callback: multer.FileFilterCallback,
      callback,
    ) {
      // 当传入自定义校验时
      if (mimeType === 'custom') callback(null, true);
      else {
        const isValidate = Object.values(MimeTypeMapping[mimeType]).includes(
          file.mimetype,
        );
        if (isValidate) callback(null, true);
        else callback(new BadRequestException('上传文件类型有误'), false);
      }
    },
  };
}
