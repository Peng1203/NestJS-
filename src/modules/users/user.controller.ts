import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Put,
  ParseIntPipe,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { Response } from 'express';
import { ResponseMsgEnum } from '@/helper/enums';
import { FindUserDto } from './dto/find-user-dto';
import { IdsDto } from '@/common/dto';
import { RolesService } from '../roles/roles.service';
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly rolesService: RolesService,
  ) {}

  @Get()
  public async findAll(
    @Res({ passthrough: true }) res: Response,
    @Query() query: FindUserDto,
  ) {
    res.resMsg = ResponseMsgEnum.TRUE;
    const { list, total } = await this.userService.findAll(query);
    return { list, total };
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const isExist = await this.rolesService.roleIsExist(createUserDto.role);
    if (!isExist) throw new NotFoundException('选择的角色无效：角色不存在。');

    return this.userService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Put(':id')
  updateUser(
    @Res({ passthrough: false }) res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(
    @Res({ passthrough: true }) res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const delRes = await this.userService.remove(id);
    res.resMsg = delRes ? ResponseMsgEnum.TRUE : ResponseMsgEnum.FALSE;
    return delRes ? '删除用户成功' : '删除用户失败';
  }

  @Delete()
  async batchDelete(
    @Res({ passthrough: true }) res: Response,
    @Body() { ids }: IdsDto,
  ) {
    const delRes = await this.userService.remove(ids);
    res.resMsg = delRes ? ResponseMsgEnum.TRUE : ResponseMsgEnum.FALSE;
    return delRes ? `成功删除 ${delRes} 用户` : '删除用户失败';
  }
}
