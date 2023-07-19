import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import type { Response } from 'express';

@Injectable()
export class GlobalResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse<Response>();
        response.removeHeader('X-Powered-By');
        return {
          code: response.statusCode,
          message: response.resMsg ?? 'Success',
          data,
        };
      }),
    );
  }
}
