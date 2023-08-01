import { PWD_SECRET } from '@/config/sign';
import crypto from 'crypto';

export function pwdEncryption(
  originPwd: string,
  secret: string = PWD_SECRET,
): string {
  // 创建一个随机的盐值
  // const salt = crypto.randomBytes(16).toString('hex');
  // const hash = crypto.createHash('md5');
  // hash.update(originPwd);
  // const val = hash.digest('hex');

  // const hash = crypto.createHmac('md5', secret);
  const hash = crypto.createHmac('sha256', secret);
  hash.update(originPwd);
  return hash.digest('hex');
}
