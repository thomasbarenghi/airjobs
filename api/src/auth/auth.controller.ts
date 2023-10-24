import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  UseGuards,
  Request,
  Session,
  UnauthorizedException,
  Get,
  NotAcceptableException,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local/local.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req, @Session() session): Promise<any> {
    try {
      const { user } = req;
      return {
        userId: user.id,
        sessionId: session.sessionId,
        message: 'Login successful',
      };
    } catch (error) {
      console.error('error', error);
      throw new NotAcceptableException();
    }
  }

  @Get('/verify')
  async verify(@Request() req): Promise<any> {
    try {
      const { sessionid } = req.headers;
      return await this.authService.findSessionById(sessionid);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @Get('/logout')
  async logout(@Request() req): Promise<any> {
    try {
      const { sessionid } = req.headers;
      return await this.authService.deleteSessionById(sessionid);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
