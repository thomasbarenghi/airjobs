import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { Session, AuthSchema } from './entities/auth.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local/local.strategy';
import { LocalSerializer } from './local/local.serializer';
import { UuidService } from 'src/uuid/uuid.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Session.name, schema: AuthSchema }]),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    LocalSerializer,
    UuidService,
  ],
})
export class AuthModule {}
