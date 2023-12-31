import { SetMetadata } from '@nestjs/common';
import { UserType } from './user.type.enum';

export const Roles = (...roles: UserType[]) => SetMetadata('roles', roles);
