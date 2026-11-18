import { ApiProperty } from '@nestjs/swagger';

export class CarSaveDto {
  @ApiProperty()
  brand: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  vin: string;

  @ApiProperty()
  color: string;

  @ApiProperty({ example: 1, description: 'ID of the car owner' })
  ownerId: number;
}
