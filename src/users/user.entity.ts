import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './enums/user-role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'email', nullable: false, unique: true })
  email: string;

  @Column({ name: 'password', nullable: false, unique: false })
  password: string;

  @Column({ name: 'name', nullable: false, unique: false })
  name: string;

  @Column({ name: 'role', nullable: false, type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ name: 'active', nullable: false, unique: false })
  active: boolean;
}
