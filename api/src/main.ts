import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as passport from 'passport';
import * as session from 'express-session';
import * as connectMongoDBSession from 'connect-mongodb-session';

const MongoDBStore = connectMongoDBSession(session);

/**
 * Configures and starts the NestJS application.
 */
const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);

  // Load environment variables
  ConfigModule.forRoot();

  // Enable CORS for cross-origin requests
  app.enableCors({
    credentials: true,
    origin: process.env.CLIENT_ORIGIN || '*',
  });

  // Global validation for request data
  app.useGlobalPipes(new ValidationPipe());

  // Set global API prefix
  app.setGlobalPrefix('api');

  // Configure session storage using MongoDB
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'default-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 }, // 1 year
      store: new MongoDBStore({
        collection: 'sessions',
        uri: process.env.MONGO_URI as string,
      }),
    }),
  );

  // Initialize Passport for authentication
  app.use(passport.initialize());
  app.use(passport.session());

  // Start the application on the specified port
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}`);
};

bootstrap();
