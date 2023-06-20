import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { username, password } = loginDto;
    const user = await this.userService.findByUsernameAndPassword(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.authService.generateToken(user);
    return { accessToken: token };
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.userService.create(createUserDto);
  }
}
