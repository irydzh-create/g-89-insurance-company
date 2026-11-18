import {
  Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param, ParseEnumPipe,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserRole } from './enums/user-role.enum';
import { UsersService } from './users.service';
import { UserSaveDto } from './dto/user.save.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UsersMapper } from './dto/user.mapper';


// http://10.20.30.40:3000/users
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  // CRUD - Create, Read, Update, Delete

  // POST -> http://10.20.30.40:3000/users (в теле ожидаем данные юзера)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({
    type: UserDto
  })
  async create(@Body() saveDto: UserSaveDto): Promise<UserDto> {
    return this.service.create(saveDto);
  }

  // GET -> http://10.20.30.40:3000/users
  @Get()
  async getAll(): Promise<User[]> {
    return this.service.getAllActiveUsers();
  }

  // GET -> http://10.20.30.40:3000/users/7
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.service.getActiveUserById(id);
  }

  // PATCH -> http://10.20.30.40:3000/users/7 (в теле ожидаем изменяемые данные юзера)
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: User,
  ): Promise<void> {
    await this.service.update(id, user);
  }

  // DELETE -> http://10.20.30.40:3000/users/7
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

  // PATCH -> http://10.20.30.40:3000/users/5/set-role/ADMIN
  @Patch(':id/set-role/:role')
  @HttpCode(HttpStatus.NO_CONTENT)
  async setRole(
    @Param('id', ParseIntPipe) id: number,
    @Param('role', new ParseEnumPipe(UserRole)) role: UserRole,
  ): Promise<void> {
    await this.service.setRole(id, role);
  }
}
