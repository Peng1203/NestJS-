import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { jwtConstants } from './constants';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // jwtFromRequest: (req: Request) => {
      //   console.log('req ----->', req);
      // },
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      issuer: 'naruto',
    } as StrategyOptions);
  }
  // user 参数为 获取解析token的数据 return 内容 会作为 request 对象的 user属性存在
  async validate(payload: any) {
    console.log('JWT策略触发 ----->', payload);
    return 1212;
  }
}
