import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Car } from './car.entity';
import { CarsService } from './cars.service';
import { CarSaveDto } from './dto/car.save';
import { CarDto } from './dto/car.dto';
import { CarsMapper } from './dto/car.mapper';
@Controller('cars')
export class CarsController {
  constructor(
    private readonly service: CarsService,
    private readonly mapper: CarsMapper,
  ) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() saveDto: CarSaveDto): Promise<CarDto> {
    const car: Car = this.mapper.mapDtoToEntity(saveDto);

    const savedCar: Car = await this.service.create(car, saveDto.ownerId);

    return this.mapper.mapEntityToDto(savedCar);
  }

  @Get()
  async getAll(): Promise<Car[]> {
    return await this.service.getAllActiveCars();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Car> {
    return await this.service.getActiveCarById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() car: Car,
  ): Promise<void> {
    await this.service.update(id, car);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.service.deleteById(id);
  }

  @Patch(':id/restore')
  @HttpCode(HttpStatus.NO_CONTENT)
  async restoreById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.service.restoreById(id);
  }

  @Patch(':carId/set-owner/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async setOwner(
    @Param('carId', ParseIntPipe) carId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<void> {
    await this.service.setActiveOwnerToActiveCar(carId, userId);
  }
}
