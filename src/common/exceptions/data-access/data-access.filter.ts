import { ServerError } from '@/common/errors/server-error';
import { formatDate } from '@/utils/date.util';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
// 处理 TypeORM 抛出错误
@Catch(InternalServerErrorException)
export class DataAccessFilter implements ExceptionFilter {
  catch(exception: HttpException & ServerError, host: ArgumentsHost) {
    // const [req, res, next]: [Request, Response, Function] = host.getArgs();

    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status = exception.getStatus();
    // if (exception instanceof QueryFailedError) {
    //   console.log('是是是 ----->');
    // }
    let reason = '';
    // 当没有传入响应信息是 使用通用错误信息返回
    switch (exception.errCode) {
      case 'ER_DUP_ENTRY':
        reason = '该记录已经存在。';
        break;
      case 'ER_NO_REFERENCED_ROW':
        reason = '无法找到关联的父级记录。';
        break;
      case 'ER_ROW_IS_REFERENCED':
        reason = '操作被其他记录引用，无法执行删除或更新操作。';
        break;
      case 'ER_NO_DEFAULT_FOR_FIELD':
        reason = '必需的字段缺少值。';
        break;
    }
    // 写入错误的logger日志
    console.log(
      ' exception.message  ----->',
      exception.message ? `${exception.message}，${reason}` : reason,
    );
    res.status(status).json({
      code: status,
      path: req.url,
      methods: req.method,
      message: exception.message ? `${exception.message}, ${reason}` : reason,
      timestamp: formatDate(),
    });
  }
}
