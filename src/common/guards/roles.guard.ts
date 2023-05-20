import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import { RequestWithUser } from 'src/auth/dto/requestWithUser';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const req: RequestWithUser = context.switchToHttp().getRequest();

    if (!req.user) {
      throw new UnauthorizedException();
    }

    return roles.includes(req.user.role);
  }
}
