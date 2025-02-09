import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

interface PayloadJwt {
  email: string;
  sub: string;
}

@Injectable()
export class AuthService {
  private readonly jwtSecret: string =
    process.env.JWT_SECRET || 'defaultSecret';
  private readonly accessTokenExpiry: string = '1h';
  private readonly refreshTokenExpiry: string = '7d';

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * Validates a user's credentials.
   * @param email - User's email.
   * @param password - User's password.
   * @returns The authenticated user or null if authentication fails.
   */
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findUser(email);
    if (!user) throw new NotFoundException('The user does not exist');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? user : null;
  }

  /**
   * Rotates a refresh token by generating a new access and refresh token pair.
   * @param oldRefreshToken - The old refresh token.
   * @returns A new set of access and refresh tokens.
   */
  async rotateRefreshToken(oldRefreshToken: string) {
    const decodedToken = this.decodeToken(oldRefreshToken);
    const payload: PayloadJwt = {
      email: decodedToken.email,
      sub: decodedToken.id,
    };
    return this.generateTokens(payload);
  }

  /**
   * Logs in a user and generates JWT tokens.
   * @param user - The authenticated user.
   * @returns A new set of access and refresh tokens.
   */
  async login(user: User) {
    return this.generateTokens({ email: user.email, sub: user._id.toString() });
  }

  /**
   * Generates access and refresh tokens.
   * @param payload - The JWT payload.
   * @returns A new set of tokens and expiration timestamps.
   */
  private async generateTokens(payload: PayloadJwt) {
    const accessTokenExpiryInSeconds = 3600; // 1 hour in seconds

    return {
      access_token: await this.createToken(payload, this.accessTokenExpiry),
      access_token_expires_at: Date.now() + accessTokenExpiryInSeconds * 1000,
      refresh_token: await this.createToken(payload, this.refreshTokenExpiry),
    };
  }

  /**
   * Creates a JWT token.
   * @param payload - The JWT payload.
   * @param expiresIn - The expiration time.
   * @returns The signed JWT token.
   */
  private async createToken(
    payload: PayloadJwt,
    expiresIn: string,
  ): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.jwtSecret,
      expiresIn,
    });
  }

  /**
   * Decodes and verifies a JWT token.
   * @param token - The JWT token.
   * @returns The decoded payload.
   * @throws UnauthorizedException if the token is invalid.
   */
  private decodeToken(token: string) {
    try {
      return this.jwtService.verify(token, { secret: this.jwtSecret });
    } catch (error) {
      throw new UnauthorizedException(`Invalid token: ${error.message}`);
    }
  }
}
