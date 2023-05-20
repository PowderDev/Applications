import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { RequestWithUser } from 'src/auth/dto/requestWithUser';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { UsersService } from './users.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PublicUserDto } from './dto/PublicUser.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: PublicUserDto })
  @ApiOperation({ summary: 'Get me' })
  async getMe(@Req() req: RequestWithUser) {
    return this.userService.findByEmail(req.user.email);
  }
}
