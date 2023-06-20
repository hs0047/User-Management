import { UserType } from '../auth/user.type.enum';

export class CreateUserDto {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  userType: UserType;
}

export class UpdateUserDto {
  name?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  userType?: UserType;
}
