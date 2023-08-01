import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '@/common/decorators/public.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class VerifyTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // 跳过 自定义Public装饰器 修饰过的 请求
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      console.log('payload ----->', payload);
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = { ...payload, roles: ['admin'] };
    } catch {
      throw new UnauthorizedException('token已失效请重新认证');
    }
    return true;
  }

  // 提取tooken
  private extractToken(req: Request): string | undefined {
    return (
      req.headers['authorization'] ||
      req.headers['Authorization'] ||
      req.headers['token'] ||
      req.body['token'] ||
      req.query['token'] ||
      undefined
    );
    // const [type, token] = req.headers.authorization?.split(' ') ?? [];
    // console.log('type ----->', type, token);
    // return type === 'Bearer' ? token : undefined;
  }
}
