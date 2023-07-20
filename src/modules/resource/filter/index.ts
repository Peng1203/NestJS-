import { ROOT_PATH } from '@/config/resource.config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const options: MulterOptions = {
  // 存储目录
  dest: ROOT_PATH,
};
