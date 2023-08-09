import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpConfigService } from '@/config/http.config.service';

// 用于存放一些通用的功能模块
@Module({
  imports: [
    HttpModule.registerAsync({
      // 工程函数注册
      // useFactory: () => ({}),
      useClass: HttpConfigService,
      // useExisting: ConfigService,
    }),
  ],
  exports: [HttpModule],
})
export class CommonModule {}
