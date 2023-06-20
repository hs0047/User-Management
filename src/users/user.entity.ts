import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserType } from '../auth/user.type.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  address: string;

  @Column()
  password: string;

  @Column()
  userType: UserType;

  // You can add more fields as per your requirement
}
