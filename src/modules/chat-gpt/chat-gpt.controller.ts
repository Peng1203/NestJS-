import {
  Body,
  Controller,
  Get,
  Header,
  Post,
  Query,
  Res,
  Sse,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, bindNodeCallback, interval, map } from 'rxjs';
import { Public } from '@/common/decorators/public.decorator';
import { proxyHttp } from '@/utils/request';
import { SendMsgDto } from './dto/send-msg.dto';
import { Stream } from 'stream';
import { Response } from "express";


interface MessageEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}

@Controller('chat-gpt')
export class ChatGptController {
  constructor(private readonly httpService: HttpService) { }
  @Get()
  @Public()
  // @Sse('sse')
  @Header('Content-Type', 'text/event-stream')
  // @Header('Cache-Control', 'no-cache')
  // @Header('Connection', 'keep-alive')
  async ChatGPTRes(
    @Res() res: Response,
    @Query() data: SendMsgDto,
  ): Promise<any> {
    // proxyHttp({
    //   // baseURL,
    //   responseType: 'stream',
    // });

    // res.setHeader('Content-Type', 'text/event-stream')
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


    response.pipe(res);
  }

  @Sse('sse')
  @Public()
  sse(): Observable<MessageEvent> {
    try {
      return interval(1000).pipe(map((_) => ({ data: { hello: 'world' } })));
    } catch (e) {
      throw e
    }
  }

  // @Get('sse/s')
  // @Public()
  // sseH(@Res() res: any) {
  //   try {

  //     res.setHeader('Content-Type', 'text/event-stream');
  //     res.setHeader('Cache-Control', 'no-cache');
  //     res.setHeader('Connection', 'keep-alive');
  //     res.setHeader('Access-Control-Allow-Origin', '*');

  //     // Sending SSE data
  //     res.write(`data: Hello\n\n`);

  //     // Simulating events at intervals
  //     const intervalId = setInterval(() => {
  //       res.write(`data: Event\n\n`);
  //     }, 1000);

  //     // Close the SSE connection when the client disconnects
  //     res.on('close', () => {
  //       clearInterval(intervalId);
  //       res.end();
  //     });
  //   } catch (e) {
  //     console.log('e ----->', e)
  //   }
  // }

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
