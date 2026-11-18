import { User } from '../../cars/users/user.entity';
import { UserDto } from './user.dto';
import { UserSaveDto } from './user.save.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersMapper {
  mapEntityToDto(entity: User): UserDto {
    const dto: UserDto = new UserDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.role = entity.role;
    return dto;
  }

  mapDtoToEntity(saveDto: UserSaveDto): User {
    const entity: User = new User();
    entity.email = saveDto.email;
    entity.password = saveDto.password;
    entity.name = saveDto.name;
    return entity;
  }

  mapEntityListToDtoList(entityList: User[]): UserDto[] {
    return entityList.map((u: User): UserDto => this.mapEntityToDto(u));
  }
}