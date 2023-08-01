import { PWD_SECRET } from '@/config/sign';
import crypto from 'crypto';

export function pwdEncryption(originPwd: string, secret: string): String {
  // 创建一个随机的盐值
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.createHash('md5');
  const val = hash.update(originPwd);
  console.log('val ----->', val);
  // crypto.pbkdf2(originPwd, salt, 100000, 64, 'sha512', (err, derivedKey) => {
  //   if (err) throw err;

  //   const hashedPassword = derivedKey.toString('hex');
  //   // console.log('Salt:', salt);
  //   console.log('Hashed Password:', hashedPassword);
  // });
  return '';
}

pwdEncryption('123456', PWD_SECRET);
pwdEncryption('1234561', PWD_SECRET);
pwdEncryption('123456', PWD_SECRET);
