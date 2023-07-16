import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { FindUserDto } from './dto/find-user-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(params: FindUserDto) {
    try {
      const { queryStr, page, pageSize, column, order } = params;
      return await this.userRepository.findAndCount({
        where: {
          userName: Like(`%${queryStr}%`),
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        order: { [column || 'id']: order || 'ASC' },
        // 关联查询
        relations: ['role'],
      });
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
      console.log('addRes ----->', addRes);
      return 'This action adds a new user';
    } catch (e) {
      console.log('e ----->', e);
      console.log('e ----->', e.QueryFailedError, e.name);
      console.log('e ----->', e.code);
      throw new InternalServerErrorException(e.message, '123');
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
