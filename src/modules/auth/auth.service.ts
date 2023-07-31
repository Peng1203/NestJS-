import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async signIn({ userName, password }: UserLoginDto) {
    const matchRes = await this.userService.matchUserAndPwd({
      userName,
      password,
    });
    if (!matchRes) throw new UnauthorizedException('账号或密码错误');
    const token = await this.jwtService.signAsync({
      userName,
      secret: '114514',
    });
    return {
      token,
    };
  }

  async generateGwt(userName) {
    this.jwtService.sign({
      id: userName,
    });
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
