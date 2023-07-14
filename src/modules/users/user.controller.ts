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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { Response } from 'express';
import { MsgEnums } from '@/helper/enums';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async findAll(@Res({ passthrough: true }) res: Response) {
    // res.status(400);
    res.resMsg = MsgEnums.TRUE;
    const [list, total] = await this.userService.findAll();
    return { list, total };
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(' ----->', createUserDto);
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Put(':id')
  updateUser(
    @Res({ passthrough: false }) res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    res.send('修改成功!!!');
  }
}
