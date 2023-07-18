import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { RolesService } from '../roles/roles.service';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RolesModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule {}
