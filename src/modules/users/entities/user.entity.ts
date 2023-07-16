import { DateTimeTransformer } from '@/utils/dateTimeTransformer';
import {
  Entity,
  Column,
  Index,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Role } from '@/modules/roles/entities/role.entity';

@Entity({ name: 'user' })
@Unique(['userName'])
export class User {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Index('index_user_name')
  @Column({ name: 'user_name', type: 'varchar', length: 255 })
  readonly userName: string;

  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn()
  role: Role;

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
  readonly updateTime: Date | string;
}
