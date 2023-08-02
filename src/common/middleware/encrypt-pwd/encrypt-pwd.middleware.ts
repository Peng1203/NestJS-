import { pwdEncryption } from '@/utils/pwd.util';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// 加密字段
const encryptedParams: string[] = ['password'];

@Injectable()
export class EncryptPwdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('触发了加密中间件 ----->', req.body);
    for (const key in req.body) {
      if (encryptedParams.includes(key))
        req.body[key] = pwdEncryption(req.body[key]);
    }
    next();
  }
}
