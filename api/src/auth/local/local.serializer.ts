import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity'; 
import { AuthService } from '../auth.service';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  serializeUser(user: User, done: CallableFunction) {
    done(null, {
      userId: user._id,
      email: user.email,
      provider: 'local',
    });
  }

  async deserializeUser(serializedUser: any, done: CallableFunction) {
    const user = await this.authService.findUserById(serializedUser.userId);
    done(null, {
      userId: user.id,
      email: user.email,
      provider: 'local',
    });
  }
}
