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
  Put,
} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

import { Policy } from './policy.entity';
import { PoliciesService } from './policies.service';
import { PoliciesMapper } from './dto/policy.mapper';
import { PolicyDto } from './dto/policy.dto';
import { PolicySaveDto } from './dto/policy.save';

@Controller('policies')
export class PoliciesController {
  constructor(
    private readonly service: PoliciesService,
    private readonly mapper: PoliciesMapper,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: PolicySaveDto })
  @ApiCreatedResponse({ type: PolicyDto })
  async create(@Body() saveDto: PolicySaveDto): Promise<PolicyDto> {
    const policy = this.mapper.mapDtoToEntity(saveDto);

    const savedPolicy = await this.service.create(
      policy,
      saveDto.holderId,
      saveDto.agentId,
    );

    return this.mapper.mapEntityToDto(savedPolicy);
  }

  @Get()
  @ApiOkResponse({ type: PolicyDto, isArray: true })
  async getAll(): Promise<PolicyDto[]> {
    const policies = await this.service.getAllActivePolicies();

    return policies.map((policy: Policy) => this.mapper.mapEntityToDto(policy));
  }

  @Get(':id')
  @ApiOkResponse({ type: PolicyDto })
  async getById(@Param('id', ParseIntPipe) id: number): Promise<PolicyDto> {
    const policy = await this.service.getActivePolicyById(id);

    return this.mapper.mapEntityToDto(policy);
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

  @Put(':policyId/add-car/:carId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async addCar(
    @Param('policyId', ParseIntPipe) policyId: number,
    @Param('carId', ParseIntPipe) carId: number,
  ): Promise<void> {
    await this.service.addActiveCarToActivePolicy(policyId, carId);
  }
}
