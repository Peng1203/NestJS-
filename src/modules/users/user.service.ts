import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    const data = await this.userRepository.find();
    // console.log('data ----->', data);
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    console.log('addResult ----->', user);
    const addRes = await this.userRepository.save(user);
    console.log('addRes ----->', addRes);
    return 'This action adds a new user';
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
