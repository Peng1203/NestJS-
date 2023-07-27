import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserStatusDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { FindUserDto } from './dto/find-user-dto';
import { ServerError } from '@/common/errors/server-error';
import { UserData, UserStruct } from './interface';
import * as svgCaptcha from "svg-captcha";
import { CAPTCHA_EXPIRESIN } from '@/config/system.config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  async findAll(params: FindUserDto): Promise<UserData> {
    try {
      const { queryStr, page, pageSize, column, order } = params;
      const [list, total] = await this.userRepository.findAndCount({
        where: {
          userName: Like(`%${queryStr}%`),
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        order: { [column || 'id']: order || 'ASC' },
        // 关联查询
        relations: ['role'],
        // select: {
        //   id: true,
        //   userName: true,
        //   createTime: true,
        //   updateTime: true,
        //   role: {
        //     id: true,
        //     roleName: true,
        //   },
        // },
      });
      const data: UserStruct[] = list.map(({ role, ...user }) => ({
        ...user,
        roleId: role.id,
        roleName: role.roleName,
      }));
      return { list: data, total };
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      const addRes = await this.userRepository.save(user);
      return addRes;
    } catch (e) {
      throw new ServerError(e.code, '创建用户失败');
    }
  }

  async update(id: number, data: UpdateUserDto | UpdateUserStatusDto) {
    try {
      const updateRes = await this.userRepository.update(id, data);
      return !!updateRes.affected;
    } catch (e) {
      throw new ServerError(e.code, '更新用户失败');
    }
  }

  async remove(id: number | number[]) {
    try {
      const delRes = await this.userRepository.delete(id);
      return delRes.affected;
    } catch (e) {
      throw new ServerError(e.code, '删除用户失败');
    }
  }

  async userIsExist(id: number): Promise<boolean> {
    return !!(await this.userRepository.findOne({ where: { id } }));
  }

  private rn(min, max) {
    return parseInt(Math.random() * (max - min) + min)
  }

  // 随机颜色
  private rc(min, max, opacity) {
    let r = this.rn(min, max)
    let g = this.rn(min, max)
    let b = this.rn(min, max)
    return `rgba(${r},${g},${b},${opacity})`
  }
  // 生成验证码
  generateCaptcha() {
    // createMathExpr 创建一个 简单加法的 svg 验证码
    return svgCaptcha.create({
      size: 4, // 验证码长度
      ignoreChars: 'OlI', // 排除字符
      noise: 2, // 干扰线
      color: false, // 验证码字符颜色
      background: this.rc(130, 230, 0.3) // 验证码背景颜色
      // background: "#cc9966" // 验证码背景颜色
    })
  }

  // 验证码是否过期
  captchaIsExpire(renderTimeStamp: number = 0): boolean {
    // return (Date.now() > renderTimeStamp + 10)
    return (Date.now() > renderTimeStamp + CAPTCHA_EXPIRESIN)
  }
  // 验证码是否通过校验
  captchaIsValidataPass(renderCaptcha: string, validCaptcha: string): boolean {
    // console.log('renderCaptcha ----->', renderCaptcha)
    // console.log('validCaptcha ----->', validCaptcha)
    // 不区分大小写
    return renderCaptcha.toLocaleLowerCase() === validCaptcha.toLocaleLowerCase()
  }
}
