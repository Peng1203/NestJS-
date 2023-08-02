import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
// 扩展 Express 的 请求 响应 属性
declare module 'express' {
  interface Response extends ExpressResponse {
    resMsg: string;
  }

  interface Request extends ExpressRequest {
    user: any;
  }
}
