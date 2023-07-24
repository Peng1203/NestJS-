import { HttpToHttpsMiddleware } from './http.to.https.middleware';

describe('HttpToHttpsMiddleware', () => {
  it('should be defined', () => {
    expect(new HttpToHttpsMiddleware()).toBeDefined();
  });
});
