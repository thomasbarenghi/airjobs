import { Controller, Post, UseGuards, Res, Req, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';
import { Response } from 'express';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RefreshResponseDto } from './dto/refresh-response.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

// TODO: ACTUALIZAR DOMINIO CON VARIABLE DE ENTORNO
const clientDomain = 'localhost';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req): Promise<LoginResponseDto> {
    const { access_token, refresh_token, access_token_expires_at } =
      await this.authService.login(req.user);

    console.log('login');

    return {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      role: req.user.role,
      access_token,
      access_token_expires_at,
      refresh_token,
    };
  }

  @Public()
  @Post('refresh')
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<RefreshResponseDto> {
    const oldRefreshToken = refreshTokenDto.refreshToken;
    console.log('refresh', oldRefreshToken);

    const { access_token, refresh_token, access_token_expires_at } =
      await this.authService.rotateRefreshToken(oldRefreshToken);

    console.log(
      'fecha token',
      new Date(access_token_expires_at).toLocaleString(),
      access_token_expires_at,
    );

    return { access_token, access_token_expires_at, refresh_token };
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      domain: clientDomain,
    });

    return res.send({ message: 'Logout successful' });
  }
}
