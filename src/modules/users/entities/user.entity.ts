import { formatDate } from '@/utils/date.util';
import { DateTimeTransformer } from '@/utils/dateTimeTransformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
@Unique(['userName'])
export class User {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ name: 'user_name', type: 'varchar', length: 255 })
  readonly userName: string;

  @CreateDateColumn({
    name: 'create_time',
    type: 'datetime',
    transformer: new DateTimeTransformer(),
  })
  readonly createTime: Date | string;

  @UpdateDateColumn({
    name: 'update_time',
    type: 'datetime',

    transformer: new DateTimeTransformer(),
  })
  readonly updateTime: Date;
}

function test(params: any) {}
