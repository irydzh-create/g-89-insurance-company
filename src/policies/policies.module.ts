import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PoliciesController } from './policies.controller';
import { Policy } from './policy.entity';
import { PoliciesRepository } from './policies.repository';
import { PoliciesService } from './policies.service';
import { PoliciesMapper } from './dto/policy.mapper';

import { CarsModule } from '../cars/cars.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [PoliciesController],

  providers: [PoliciesRepository, PoliciesService, PoliciesMapper],

  imports: [TypeOrmModule.forFeature([Policy]), CarsModule, UsersModule],

  exports: [PoliciesService, PoliciesMapper],
})
export class PoliciesModule {}
