import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from '../interfaces/valid-roles';

export const ROLES_KEY = 'roles';
export const RoleProtected = (...roles: ValidRoles[]) =>
  SetMetadata(ROLES_KEY, roles);
