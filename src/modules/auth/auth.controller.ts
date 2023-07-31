import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { UserService } from '../users/user.service';
import { Response } from 'express';
import { ResponseMsgEnum } from '@/helper/enums';
import { VerifyTokenGuard } from './auth.guard';
import { Public } from '@/common/decorators/public.decorator';
// import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @Public()
  // @UseGuards(AuthGuard(''))
  async login(
    @Body() data: UserLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    // 校验登录账号信息
    const info = await this.authService.signIn(data);
    return info;
  }

  @UseGuards(VerifyTokenGuard)
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
