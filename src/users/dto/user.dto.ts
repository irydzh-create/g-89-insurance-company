import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../cars/users/enums/user-role.enum';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  role: UserRole;
}