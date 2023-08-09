import { Module } from '@nestjs/common';
import { ChatGptService } from './chat-gpt.service';
import { ChatGptController } from './chat-gpt.controller';
import { HttpModule } from '@nestjs/axios';
import { ChatGPTConfigService } from '@/config/http.config.service';

@Module({
  imports: [HttpModule.registerAsync({ useClass: ChatGPTConfigService })],
  controllers: [ChatGptController],
  providers: [ChatGptService],
})
export class ChatGptModule {}
