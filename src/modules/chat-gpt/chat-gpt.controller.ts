import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, map } from 'rxjs';
import { Public } from '@/common/decorators/public.decorator';
import { proxyHttp } from '@/utils/request';
import { SendMsgDto } from './dto/send-msg.dto';

@Controller('chat-gpt')
export class ChatGptController {
  constructor(private readonly httpService: HttpService) {}
  @Get()
  @Public()
  async ChatGPTRes(@Body() data: SendMsgDto): Promise<any> {
    const { data: res } = await proxyHttp.post('/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: data.str }],
      max_tokens: 1000,
      temperature: 0.8,
    });

    console.log('res ----->', res);

    return res.choices;
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
