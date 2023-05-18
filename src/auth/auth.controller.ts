import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('registration')
  async registration(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.registration(dto);
    res.cookie('refreshToken', tokens.refreshToken);
    delete tokens.refreshToken;
    return tokens;
  }

  @Post('login')
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.login(dto);
    res.cookie('refreshToken', tokens.refreshToken);
    delete tokens.refreshToken;
    return tokens;
  }

  @Post('refresh')
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
