import { Injectable } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ResourceService {
  constructor(private readonly httpService: HttpService) {}
  create(createResourceDto: CreateResourceDto) {
    return 'This action adds a new resource';
  }

  findAll() {
    return `This action returns all resource`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resource`;
  }

  update(id: number, updateResourceDto: UpdateResourceDto) {
    return `This action updates a #${id} resource`;
  }

  remove(id: number) {
    return `This action removes a #${id} resource`;
  }

  async getHTML() {
    const { data: res } = await this.httpService.axiosRef({
      url: 'https://www.baidu.com',
      method: 'get',
      params: {
        page: 1,
        pageSize: 10,
      },
    });

    console.log('res ----->', res);
  }
}
