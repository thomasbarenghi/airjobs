import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

export interface PayloadJwt {
  email: string;
  sub: string;
}

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;
  private readonly accessTokenExpiry: string;
  private readonly refreshTokenExpiry: string;
  private readonly accessTokenExpiryInSeconds: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {
    this.jwtSecret = process.env.JWT_SECRET || 'defaultSecret';
    this.refreshTokenExpiry = '7d';
    this.accessTokenExpiry = '1h'; //1h
    this.accessTokenExpiryInSeconds = '3600'; //3600
  }

  // PUBLIC METHODS ------------------------------------------------------------
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findUser(email);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    return isPasswordValid ? user : null;
  }

  async rotateRefreshToken(oldRefreshToken: string) {
    const decodedToken = this.decodeToken(oldRefreshToken);
    const payload = { email: decodedToken.email, sub: decodedToken.id };
    return this.generateTokens(payload);
  }

  async login(user: User) {
    console.log(user);

    return this.generateTokens({ email: user.email, sub: user._id.toString() });
  }

  // TOKEN ADMIN ------------------------------------------------------------
  private async generateTokens(payload: PayloadJwt) {
    return {
      access_token: await this.createToken(payload, this.accessTokenExpiry),
      access_token_expires_at:
        Date.now() + parseInt(this.accessTokenExpiryInSeconds, 10) * 1000,
      refresh_token: await this.createToken(payload, this.refreshTokenExpiry),
    };
  }

  private async createToken(payload: PayloadJwt, expiresIn: string) {
    return this.jwtService.sign(payload, {
      privateKey: this.jwtSecret,
      expiresIn,
    });
  }

  private decodeToken(token: string) {
    try {
      return this.jwtService.verify(token, { secret: this.jwtSecret });
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
