import day from 'dayjs';
import { ValueTransformer } from 'typeorm';
// 格式化日期
export class DateTimeTransformer implements ValueTransformer {
  to(value: Date): Date | string {
    return value;
  }

  from(value: string): Date | string {
    return day(value).format('YYYY-MM-DD HH:mm:ss');
  }
}
