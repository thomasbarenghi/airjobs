import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as passport from 'passport';
import * as session from 'express-session';
import * as connectMongoDBSession from 'connect-mongodb-session';

const MongoDBStore = connectMongoDBSession(session);
const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  ConfigModule.forRoot();
  app.enableCors({
    credentials: true,
    origin: '*',
  });
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api/');

  app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 365 * 24 * 60 * 60 * 1000,
      },
      store: new MongoDBStore({
        collection: 'sessions',
        uri: process.env.MONGO_URI,
      }),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const port = process.env.PORT;

  await app.listen(port);
};

bootstrap();
