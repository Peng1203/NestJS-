import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { SchedulerRegistry } from '@nestjs/schedule';

import { CronJob } from 'cron';

@Controller('jobs')
export class JobsController {
  constructor(
    private readonly jobsService: JobsService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  @Post(':name')
  stopTask(@Param('name') taskName: string) {
    console.log('tas ----->', taskName);
    // 获取定时任务的实例
    const job = this.schedulerRegistry.getCronJob(taskName);
    // getCronJob()方法返回一个命名的定时任务。然后返回一个包含下列方法的CronJob对象：
    // stop()-停止一个按调度运行的任务
    // start()-重启一个停止的任务
    // setTime(time:CronTime)-停止一个任务，为它设置一个新的时间，然后再启动它
    // lastDate()-返回一个表示工作最后执行日期的字符串
    // nextDates(count:number)-返回一个moment对象的数组（大小count)，代表即将执行的任务日期
    console.log('job ----->', job);
    job.stop();

    return `暂停定时任务!!! 最后一次执行在: ${job.lastDate()}`;
  }

  @Post('add/:name/:seconds')
  addCronJob(
    @Param('name') name: string,
    @Param('seconds', ParseIntPipe) seconds: number,
  ) {
    const job = new CronJob(`${seconds} * * * * *`, () => {
      console.log('动态创建的定时任务触发了 ----->');
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    return '动态定时任务创建成功!';
  }

  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(+id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(+id);
  }
}
