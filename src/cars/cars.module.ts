import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { CarsRepository } from './cars.repository';
import { CarsService } from './cars.service';
import { UsersModule } from '../users/users.module';
import { CarsMapper } from './dto/car.mapper';

@Module({
  controllers: [CarsController],
  providers: [CarsRepository, CarsService, CarsMapper],
  imports: [TypeOrmModule.forFeature([Car]), UsersModule],
  exports: [CarsService, CarsMapper],
})
export class CarsModule {}
