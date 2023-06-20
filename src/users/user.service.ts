import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UserType } from '../auth/user.type.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    // Only allow listing of Student, Merchant, and Mentor users
    return this.userRepository.find({
      where: [
        { userType: UserType.Student },
        { userType: UserType.Merchant },
        { userType: UserType.Mentor },
      ],
    });
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOneOrFail({ where: { id } });
    return user;
  }

  async findByUsernameAndPassword(
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email, password },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(userData: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async update(id: number, userData: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    Object.assign(user, userData);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findById(id);
    await this.userRepository.remove(user);
  }
}
