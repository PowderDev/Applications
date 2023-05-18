import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { RequestWithUser } from 'src/auth/dto/request-with-user';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req: RequestWithUser) {
    return this.userService.findByEmail(req.user.email);
  }
}
