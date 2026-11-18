import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersMapper } from './dto/user.mapper';

@Module({
  controllers: [UsersController],
  providers: [UsersRepository, UsersService,UsersMapper],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService,UsersMapper],
})
export class UsersModule {}
