import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async signIn({ userName, password }: UserLoginDto) {
    const user = await this.userService.matchUserAndPwd({
      userName,
      password,
    });
    if (!user) throw new UnauthorizedException('账号或密码错误');
    const token = await this.generateToken(user.id, userName);
    return {
      token,
    };
  }

  // 生成token
  async generateToken(id: number, userName: string) {
    return `${await this.jwtService.signAsync({
      sub: id,
      userName,
    })}`;
  }

  // 验证token
  async verifyToken(
    token: string,
  ): Promise<boolean | { userName: string; id: number }> {
    try {
      const { sub, userName } = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      return { id: sub, userName };
    } catch (e) {
      return false;
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
