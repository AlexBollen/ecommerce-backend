import { SetMetadata } from "@nestjs/common";

export const IsAuthorized = (roles: number[]) => SetMetadata('roles', roles)