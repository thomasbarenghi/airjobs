import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { comparePasswords } from '../utils/bcrypt.utils';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session } from './entities/auth.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Session.name) private authModel: Model<Session>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  public findUserByEmail(email: string) {
    const user = this.userModel.findOne({ email: email });

    if (!user) {
      throw new NotAcceptableException('Could not find the user');
    }

    return user;
  }

  public findUserById(id: string) {
    const user = this.userModel.findById(id);

    if (!user) {
      throw new NotAcceptableException('Could not find the user');
    }

    return user;
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findUserByEmail(username);

    const passwordValid = await comparePasswords(password, user.password);

    if (!passwordValid) {
      throw new NotAcceptableException('Invalid password');
    }

    return {
      id: user.id,
      email: user.email,
    };
  }

  async findSessionById(sessionId: string) {
    const session = await this.authModel.find({
      'session.sessionId': sessionId,
    });

    const parsedSessionId = JSON.parse(JSON.stringify(session[0])).session;

    if (!parsedSessionId) {
      throw new UnauthorizedException();
    }

    return {
      verified: true,
    };
  }

  async deleteSessionById(sessionId: string) {
    await this.authModel.deleteOne({
      'session.sessionId': sessionId,
    });
    return {
      message: 'Logout successful',
    };
  }
}
