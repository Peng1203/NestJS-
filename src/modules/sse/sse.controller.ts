import { Controller, Get, Res, Sse, MessageEvent } from "@nestjs/common";
import { Observable, interval, map } from "rxjs";
import { Response } from 'express';
import { readFileSync } from "fs";
import { join } from "path";


@Controller('sse')
export class SSEController {
  @Get('index')
  index(@Res() response: Response) {
    response
      .type('text/html')
      .send(readFileSync(join(process.cwd(), '/src/public/04.1SSE.html')).toString());
  }

  @Sse()
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map((_) => ({ data: { hello: 'world' } } as MessageEvent)),
    );
  }

  @Get('stream')
  sseH(@Res() res): void {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const interval$ = interval(1000).pipe(map((_) => ({ data: { hello: 'world' } })));

    const subscription = interval$.subscribe(
      (data) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
      },
      (error) => {
        console.error('SSE Error:', error);
      },
      () => {
        console.log('SSE connection closed.');
        res.end();
      }
    );

    res.on('close', () => {
      console.log('SSE connection closed by client.');
      subscription.unsubscribe();
    });
  }
}