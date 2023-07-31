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
import { Transform } from 'class-transformer';

// 用户状态枚举
enum UserStatus {
  Disabled = 0,
  Enabled = 1,
}

@Entity({ name: 'user' })
@Unique(['userName'])
export class User {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Index('index_user_name')
  @Column({ name: 'user_name', type: 'varchar', length: 255 })
  readonly userName: string;

  @Column({ type: 'varchar', length: 60, default: '123456' })
  readonly password: string;

  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn()
  readonly role: Role;

  @Column({
    name: 'user_status',
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.Enabled,
    comment: '0 禁用 1 启用',
  })
  readonly userStatus: UserStatus;

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
