import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { SocksProxyAgent } from 'socks-proxy-agent';
import tunnel from 'tunnel';

@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
  createHttpOptions(): HttpModuleOptions {
    return {
      timeout: 5000,
      maxRedirects: 5,
      headers: {},
    };
  }
}

@Injectable()
export class ChatGPTConfigService implements HttpModuleOptionsFactory {
  createHttpOptions(): HttpModuleOptions {
    return {
      baseURL: 'https://api.openai.com/v1',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      // 设置代理 走本地 VPN
      // httpsAgent: new SocksProxyAgent(process.env.SOCKS_PROXY),
      httpsAgent: tunnel.httpsOverHttp({
        proxy: {
          host: '127.0.0.1',
          port: 15732,
        },
      }),
    };
  }
}
