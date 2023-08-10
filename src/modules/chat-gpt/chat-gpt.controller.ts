import {
  Body,
  Controller,
  Get,
  Header,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, map } from 'rxjs';
import { Public } from '@/common/decorators/public.decorator';
import { proxyHttp } from '@/utils/request';
import { SendMsgDto } from './dto/send-msg.dto';
import { Stream } from 'stream';

@Controller('chat-gpt')
export class ChatGptController {
  constructor(private readonly httpService: HttpService) {}
  @Get()
  @Public()
  @Header('Content-Type', 'text/event-stream')
  async ChatGPTRes(
    @Res() res: Response,
    @Query() data: SendMsgDto,
  ): Promise<any> {
    // proxyHttp({
    //   // baseURL,
    //   responseType: 'stream',
    // });
    const { data: response } = await proxyHttp.post<Stream>(
      '/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: data.str }],
        // max_tokens: 20,
        max_tokens: 1000,
        temperature: 0.8,
        stream: true,
      },
      { responseType: 'stream' },
    );
    // console.log('res ----->', res);
    response.pipe(res as any);
  }

  // @Get()
  // @Public()
  // async fetchData(): Promise<any> {
  //   const data = {
  //     model: 'gpt-3.5-turbo',
  //     messages: [{ role: 'user', content: 'hello' }],
  //     temperature: 0.7,
  //     max_tokens: 20,
  //   };

  //   return this.httpService
  //     .post('/chat/completions', data)
  //     .pipe(map((response) => response.data))
  //     .toPromise();
  // }
}
