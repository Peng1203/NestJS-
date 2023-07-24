import { Module } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpConfigService } from '@/config/http.config.service';

@Module({
  imports: [
    // 注册HTTP服务客户端
    // HttpModule,
    // HttpModule.register({}),
    // HttpModule.registerAsync({}),
    HttpModule.registerAsync({
      // 工程函数注册
      // useFactory: () => ({}),
      useClass: HttpConfigService,
      // useExisting: ConfigService,
    }),
  ],
  controllers: [ResourceController],
  providers: [ResourceService],
})
export class ResourceModule {}
