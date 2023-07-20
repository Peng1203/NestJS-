import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  // 每分钟的 45 秒时执行
  // @Cron('45 * * * * *')
  // @Cron(CronExpression.EVERY_10_SECONDS)
  // handleCron() {
  //   this.logger.debug('Called when the current second is 45');
  // }

  // @Interval(10000) // 间隔任务 底层使用JavaScript的setInterval()函数
  // @Interval('taskName',10000) // API控制间隔

  // @Timeout(5000) // 延时任务 底层使用 JavaScript 的setTimeout()方法
  // @Timeout('taskName',5000) // API控制间隔
  @Cron('45 * * * * *', {
    name: 'notifications',
  })
  testCron() {
    console.log(' 测试 定时任务触发  !!! ----->');
  }

  // @Cron('* * * * * *', { name: 'testTask2' })
  // testTask2() {
  //   console.log('testTask2 执行了 ----->');
  // }

  // @Interval('intervalJob', 3000)
  // intervalTask() {
  //   console.log(' 间隔定时任务执行! ----->');
  // }
}
