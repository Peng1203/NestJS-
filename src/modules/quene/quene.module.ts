import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { QueneController } from './quene.controller';
import { QueneService } from './quene.service';

@Module({
  imports: [
    // bull 注册队列
    BullModule.registerQueueAsync({
      name: 'task',
      useFactory: () => ({
        redis: {
          host: 'localhost',
          port: 6379,
        },
      }),
    }),
  ],
  controllers: [QueneController],
  providers: [QueneService],
})
export class QueneModule {}
