import { ApiProperty } from '@nestjs/swagger';
import { InsuranceType } from '../enums/insurance-type.enum';

export class PolicySaveDto {
  @ApiProperty({ enum: InsuranceType, example: InsuranceType.CASCO })
  type: InsuranceType;

  @ApiProperty({ example: 1 })
  holderId: number;

  @ApiProperty({ example: 1 })
  agentId: number;

  @ApiProperty({ example: 1000000 })
  coverageInCents: number;

  @ApiProperty({ example: '2026-11-18T00:00:00.000Z' })
  issuedAt: string;

  @ApiProperty({ example: '2027-11-18T00:00:00.000Z' })
  expiresAt: string;
}
