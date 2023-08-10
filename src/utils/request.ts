import axios from 'axios';
import tunnel from 'tunnel';

const agent = tunnel.httpsOverHttp({
  proxy: {
    host: '127.0.0.1',
    port: 15732,
  },
});
export const proxyHttp = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
  // 设置代理 走本地 VPN
  // httpsAgent: new SocksProxyAgent(process.env.SOCKS_PROXY),
  httpsAgent: agent,
  proxy: false,
});
