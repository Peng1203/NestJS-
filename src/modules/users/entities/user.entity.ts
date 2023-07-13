import { formatDate } from '@/utils/date.util';
import { DateTimeTransformer } from '@/utils/dateTimeTransformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ name: 'user_name', type: 'varchar', length: 255 })
  readonly userName: string;

  @Column({
    name: 'create_time',
    type: 'datetime',
    default: formatDate(),
    transformer: new DateTimeTransformer(),
  })
  readonly createTime: Date | string;
}

function test(params: any) {}
