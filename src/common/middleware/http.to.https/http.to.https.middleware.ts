import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HttpToHttpsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('req. ----->', req.protocol);
    // 判断请求是否通过HTTPS
    if (
      req.headers['x-forwarded-proto'] !== 'https' &&
      req.hostname !== 'localhost'
    ) {
      // 重定向到HTTPS协议
      res.redirect(`https://${req.hostname}${req.originalUrl}`);
    } else {
      // 继续处理其他中间件或请求处理器
      next();
    }
  }
}
