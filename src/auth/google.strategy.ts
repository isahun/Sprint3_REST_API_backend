import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import type { Profile } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    // 1. Get values separately to validate and satisfy TypeScript type safety
    const clientID = configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = configService.get<string>('GOOGLE_CLIENT_SECRET');

    // 2. Throw error if credentials are missing to ensure they are not undefined
    if (!clientID || !clientSecret) {
      throw new Error('Missing Google credentials in .env file');
    }

    super({
      //at this point TS knows what to do with all these
      clientID,
      clientSecret,
      callbackURL: 'http://localhost:3000/auth/google/callback', //The URL where Google redirects after login
      scope: ['email', 'profile'], //Requested permissions from user
    });
  }

  // Function triggered after Google successfully authenticates the user.
  validate(accessToken: string, refreshToken: string, profile: Profile) {
    const user = {
      googleId: profile.id,
      email: profile.emails?.[0]?.value,
    };

    return user;
  }
}
