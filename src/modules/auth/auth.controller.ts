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
  HttpStatus,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { UserService } from '../users/user.service';
import { Request, Response } from 'express';
import { ResponseMsgEnum } from '@/helper/enums';
import { VerifyTokenGuard } from './auth.guard';
import { Public } from '@/common/decorators/public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from '@/common/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Public()
  // @UseGuards(AuthGuard(''))
  // @UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard)
  async login(
    @Body() data: UserLoginDto,
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    console.log('req ----->', req.user);
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
