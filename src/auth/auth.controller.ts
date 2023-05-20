import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthRegistration } from './contracts/auth.registration';
import { AuthLogin } from './contracts/auth.login';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({ type: AuthRegistration.Response })
  @ApiOperation({ summary: 'User registration' })
  @Post('registration')
  async registration(
    @Body() dto: AuthRegistration.Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.registration(dto);
    res.cookie('refreshToken', tokens.refreshToken);
    delete tokens.refreshToken;
    return tokens;
  }

  @ApiCreatedResponse({ type: AuthLogin.Response })
  @ApiOperation({ summary: 'User login' })
  @Post('login')
  async login(
    @Body() dto: AuthLogin.Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.login(dto);
    res.cookie('refreshToken', tokens.refreshToken);
    delete tokens.refreshToken;
    return tokens;
  }

  @ApiCreatedResponse({ type: AuthLogin.Response })
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh JWT token' })
  async refresh(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    const refreshToken = req.cookies.refreshToken as string;
    const tokens = await this.authService.refresh(refreshToken);
    res.cookie('refreshToken', tokens.refreshToken);
    delete tokens.refreshToken;
    return tokens;
  }
}
