import { Injectable } from '@nestjs/common';
import { Policy } from '../policy.entity';
import { PolicyDto } from './policy.dto';
import { PolicySaveDto } from './policy.save';
import { UsersMapper } from '../../users/dto/user.mapper';
import { CarsMapper } from '../../cars/dto/car.mapper';

@Injectable()
export class PoliciesMapper {
  constructor(
    private readonly usersMapper: UsersMapper,
    private readonly carsMapper: CarsMapper,
  ) {}

  mapDtoToEntity(saveDto: PolicySaveDto): Policy {
    const entity = new Policy();

    entity.type = saveDto.type;
    entity.coverageInCents = saveDto.coverageInCents;
    entity.issuedAt = new Date(saveDto.issuedAt);
    entity.expiresAt = new Date(saveDto.expiresAt);
    entity.cars = [];

    return entity;
  }

  mapEntityToDto(entity: Policy): PolicyDto {
    const dto = new PolicyDto();

    dto.id = entity.id;
    dto.type = entity.type;
    dto.coverageInCents = entity.coverageInCents;
    dto.issuedAt = entity.issuedAt;
    dto.expiresAt = entity.expiresAt;
    dto.active = entity.active;

    if (entity.holder) {
      dto.holder = this.usersMapper.mapEntityToDto(entity.holder);
    }

    if (entity.agent) {
      dto.agent = this.usersMapper.mapEntityToDto(entity.agent);
    }

    dto.cars = (entity.cars ?? []).map((car) =>
      this.carsMapper.mapEntityToDto(car),
    );

    return dto;
  }
}
