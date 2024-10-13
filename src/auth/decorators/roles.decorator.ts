import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/roles/enums/rol.enum';

export const ROLES_KEY = 'roles';
export const IsAuthorized = (roles: Role[]) => SetMetadata(ROLES_KEY, roles);
