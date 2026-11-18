import { Injectable, NotFoundException } from '@nestjs/common';
import { PoliciesRepository } from './policies.repository';
import { Policy } from './policy.entity';
import { Car } from '../cars/car.entity';
import { CarsService } from '../cars/cars.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class PoliciesService {
  constructor(
    private readonly repository: PoliciesRepository,
    private readonly carsService: CarsService,
    private readonly usersService: UsersService,
  ) {}

  async create(
    policy: Policy,
    holderId: number,
    agentId: number,
  ): Promise<Policy> {
    policy.active = true;

    policy.holder = await this.usersService.getActiveUserById(holderId);

    policy.agent = await this.usersService.getActiveUserById(agentId);

    policy.cars = [];

    return await this.repository.save(policy);
  }

  async getAllActivePolicies(): Promise<Policy[]> {
    const policies = await this.repository.findAllActive();

    policies.forEach((policy) => {
      this.excludeInactiveCars(policy);
    });

    return policies;
  }

  private excludeInactiveCars(policy: Policy): void {
    policy.cars = (policy.cars ?? []).filter((car: Car) => car.active);
  }

  async getActivePolicyById(id: number): Promise<Policy> {
    const policy = await this.repository.findById(id);

    if (!policy || !policy.active) {
      throw new NotFoundException('Policy not found');
    }

    this.excludeInactiveCars(policy);

    return policy;
  }

  async deleteById(id: number): Promise<void> {
    const policy = await this.getActivePolicyById(id);

    policy.active = false;

    await this.repository.save(policy);
  }

  async restoreById(id: number): Promise<void> {
    const policy = await this.repository.findById(id);

    if (policy && !policy.active) {
      policy.active = true;

      await this.repository.save(policy);
    }
  }

  async addActiveCarToActivePolicy(
    policyId: number,
    carId: number,
  ): Promise<void> {
    const policy = await this.getActivePolicyById(policyId);

    const car = await this.carsService.getActiveCarById(carId);

    policy.cars.push(car);

    await this.repository.save(policy);
  }
}
