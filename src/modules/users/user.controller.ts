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
  Header,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserStatusDto } from './dto/update-user.dto';
import type { Response } from 'express';
import { ResponseMsgEnum } from '@/helper/enums';
import { FindUserDto } from './dto/find-user-dto';
import { IdsDto } from '@/common/dto';
import { RolesService } from '../roles/roles.service';
import { ErrorMsg } from '@/helper/err.message.enums';
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly rolesService: RolesService,
  ) {}

  @Get()
  @Header('Cache-Control', 'max-age=5')
  public async findAll(
    @Res({ passthrough: true }) res: Response,
    @Query() query: FindUserDto,
  ) {
    const { list, total } = await this.userService.findAll(query);
    return { list, total };
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const isExist = await this.rolesService.roleIsExist(createUserDto.role);
    if (!isExist) throw new NotFoundException(ErrorMsg.RoleNotFound);

    return this.userService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Res({ passthrough: true }) res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserStatusDto,
  ) {
    // 判断用是否存在
    const userIsExist = await this.userService.userIsExist(id);
    if (!userIsExist) throw new NotFoundException(ErrorMsg.UserNotFound);

    const updateRes = await this.userService.update(id, data);
    res.resMsg = updateRes ? ResponseMsgEnum.TRUE : ResponseMsgEnum.FALSE;
    return updateRes ? '更新用户成功' : '更新用户失败';
  }

  @Put(':id')
  async updateUser(
    @Res({ passthrough: true }) res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ) {
    // 判断用是否存在
    const userIsExist = await this.userService.userIsExist(id);
    if (!userIsExist) throw new NotFoundException(ErrorMsg.UserNotFound);
    // 判断所选角色是否有效
    if (data?.role) {
      const roleIsExist = await this.rolesService.roleIsExist(data.role);
      if (!roleIsExist) throw new NotFoundException(ErrorMsg.RoleNotFound);
    }
    const updateRes = await this.userService.update(id, data);
    res.resMsg = updateRes ? ResponseMsgEnum.TRUE : ResponseMsgEnum.FALSE;
    return updateRes ? '更新用户成功' : '更新用户失败';
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
