import { Injectable } from '@nestjs/common';
import { Car } from '../car.entity';
import { CarSaveDto } from './car.save';
import { CarDto } from './car.dto';
import { UsersMapper } from '../../users/dto/user.mapper';

@Injectable()
export class CarsMapper {
  constructor(private readonly usersMapper: UsersMapper) {}

  mapDtoToEntity(saveDto: CarSaveDto): Car {
    const entity = new Car();

    entity.brand = saveDto.brand;
    entity.model = saveDto.model;
    entity.year = saveDto.year;
    entity.vin = saveDto.vin;
    entity.color = saveDto.color;

    return entity;
  }

  mapEntityToDto(entity: Car): CarDto {
    const dto = new CarDto();

    dto.id = entity.id;
    dto.brand = entity.brand;
    dto.model = entity.model;
    dto.year = entity.year;
    dto.vin = entity.vin;
    dto.color = entity.color;

    if (entity.owner) {
      dto.owner = this.usersMapper.mapEntityToDto(entity.owner);
    }

    return dto;
  }
}
