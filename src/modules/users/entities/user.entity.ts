import { formatDate } from '@/utils/date.util';
import { Transform } from 'class-transformer';
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
  })
  @Transform((val) => {
    console.log('val ----->', val);
  })
  readonly createTime: Date | string;
}

function test(params: any) {}
