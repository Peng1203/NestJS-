import { EncryptPwdMiddleware } from './encrypt-pwd.middleware';

describe('EncryptPwdMiddleware', () => {
  it('should be defined', () => {
    expect(new EncryptPwdMiddleware()).toBeDefined();
  });
});
