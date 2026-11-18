import { Module } from '@nestjs/common';
import { PoliciesController } from './policies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Policy } from './policy.entity';
import { PoliciesRepository } from './policies.repository';
import { PoliciesService } from './policies.service';
import { CarsModule } from '../cars/cars.module';

@Module({
  controllers: [PoliciesController],
  providers: [PoliciesRepository, PoliciesService],
  imports: [TypeOrmModule.forFeature([Policy]), CarsModule],
})
export class PoliciesModule {}
