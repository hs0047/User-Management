import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { RolesGuard } from '../auth/roles.guard';
import { UserType } from '../auth/user.type.enum';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt.strategy';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(UserType.Admin, UserType.SuperAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles(
    UserType.Admin,
    UserType.SuperAdmin,
    UserType.Student,
    UserType.Merchant,
    UserType.Mentor,
  )
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findById(@Param('id') id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @Roles(UserType.Student, UserType.Merchant, UserType.Mentor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(UserType.Student, UserType.Merchant, UserType.Mentor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
