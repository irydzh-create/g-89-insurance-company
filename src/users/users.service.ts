import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import { UserRole } from './enums/user-role.enum';
import { UserSaveDto } from './dto/user.save.dto';
import { UserDto } from './dto/user.dto';
import { UsersMapper } from './dto/user.mapper';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly mapper: UsersMapper,
  ) {}

  async create(saveDto: UserSaveDto): Promise<UserDto> {
    const entity: User = this.mapper.mapDtoToEntity(saveDto);
    entity.role = UserRole.CUSTOMER;
    entity.active = true;
    await this.repository.save(entity);
    return this.mapper.mapEntityToDto(entity);
  }

  async getAllActiveUsers(): Promise<User[]> {
    return this.repository.findAllActive();
  }

  async getActiveUserById(id: number): Promise<User> {
    const user: User | null = await this.repository.findById(id);

    if (!user || !user.active) {
      throw Error();
    }

    return user;
  }

  async update(id: number, user: User): Promise<void> {
    const foundUser: User | null = await this.repository.findById(id);

    if (foundUser) {
      foundUser.name = user.name;
      await this.repository.save(foundUser);
    }
  }

  async deleteById(id: number): Promise<void> {
    const user: User = await this.getActiveUserById(id);
    user.active = false;
    await this.repository.save(user);
  }

  async restoreById(id: number): Promise<void> {
    const foundUser: User | null = await this.repository.findById(id);

    if (foundUser && !foundUser.active) {
      foundUser.active = true;
      await this.repository.save(foundUser);
    }
  }

  async setRole(id: number, role: UserRole): Promise<void> {
    const user: User = await this.getActiveUserById(id);
    user.role = role;
    await this.repository.save(user);
  }
}
