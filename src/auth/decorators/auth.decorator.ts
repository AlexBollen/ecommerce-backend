import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from 'src/roles/enums/rol.enum';
import { IsAuthorized } from './roles.decorator';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';

export function Auth(roles: Role[]) {
  return applyDecorators(
    IsAuthorized(roles), 
    UseGuards(AuthGuard, RolesGuard)
  );
}
