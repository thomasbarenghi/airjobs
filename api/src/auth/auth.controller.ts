import { Controller, Post, UseGuards, Res, Req, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';
import { Response } from 'express';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RefreshResponseDto } from './dto/refresh-response.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

// TODO: UPDATE DOMAIN WITH ENVIRONMENT VARIABLE
const CLIENT_DOMAIN = 'localhost';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Handles user login and returns JWT tokens.
   * @param req - The request object containing user information.
   * @returns A DTO with user details and authentication tokens.
   */
  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req): Promise<LoginResponseDto> {
    const { access_token, refresh_token, access_token_expires_at } =
      await this.authService.login(req.user);

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

  /**
   * Refreshes the authentication tokens using a valid refresh token.
   * @param refreshTokenDto - DTO containing the refresh token.
   * @returns A new set of authentication tokens.
   */
  @Public()
  @Post('refresh')
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<RefreshResponseDto> {
    const { access_token, refresh_token, access_token_expires_at } =
      await this.authService.rotateRefreshToken(refreshTokenDto.refreshToken);

    return { access_token, access_token_expires_at, refresh_token };
  }

  /**
   * Logs out the user by clearing the refresh token cookie.
   * @param res - The response object.
   * @returns A success message.
   */
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@Res() res: Response): Promise<Response> {
    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      domain: CLIENT_DOMAIN,
    });

    return res.status(200).json({ message: 'Logout successful' });
  }
}
