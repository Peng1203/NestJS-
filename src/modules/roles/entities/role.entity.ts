import { User } from '@/modules/users/entities/user.entity';
import { DateTimeTransformer } from '@/utils/dateTimeTransformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'role' })
@Unique(['roleName'])
export class Role {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Index('index_role_name')
  @Column({ name: 'role_name' })
  readonly roleName: string;

  @OneToMany(() => User, (user) => user.role)
  readonly users: User[];

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
