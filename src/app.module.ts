import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CarsModule } from './cars/cars.module';
import { PoliciesModule } from './policies/policies.module';

@Module({
  imports: [
    UsersModule,
    CarsModule,
    PoliciesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: process.env.DB_PASSWORD,
      database: 'g_89_insurance_company',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
