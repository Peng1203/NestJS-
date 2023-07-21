import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    // console.log(' ----->', exception.message);
    // console.log(' ----->', exception.response);
    console.log('触发了 all 过滤器 ----->', exception);
    super.catch(exception, host);
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // res.status(status).json({
    //   code: status,
    //   error: defalueResponse!.error,
    //   path: req.url,
    //   method: req.method,
    //   message: exception.message,
    //   timestamp: formatDate(),
    // });
  }
}
