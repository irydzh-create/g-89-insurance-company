import { ApiProperty } from '@nestjs/swagger';
import { InsuranceType } from '../enums/insurance-type.enum';
import { UserDto } from '../../users/dto/user.dto';
import { CarDto } from '../../cars/dto/car.dto';

export class PolicyDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ enum: InsuranceType })
  type: InsuranceType;

  @ApiProperty({ type: () => UserDto })
  holder: UserDto;

  @ApiProperty({ type: () => UserDto })
  agent: UserDto;

  @ApiProperty({ type: () => [CarDto] })
  cars: CarDto[];

  @ApiProperty()
  coverageInCents: number;

  @ApiProperty()
  issuedAt: Date;

  @ApiProperty()
  expiresAt: Date;

  @ApiProperty()
  active: boolean;
}
