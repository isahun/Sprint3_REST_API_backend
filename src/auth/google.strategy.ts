import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
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
  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile, //Passport Profile type ensures safety when accessing nested properties.
    done: VerifyCallback,
  ): void {
    //void since no return value, calls done() function to end
    // Extract data from Google profile (name, emails, photos)
    // In real life scenario we'd find or create (if non existant) user in our DB using Google email
    const user = {
      email: profile.emails?.[0]?.value, //use conditional with "?", IF email exists, take the one at position 0
      firstName: profile.name?.givenName,
      lastName: profile.name?.familyName,
      picture: profile.photos?.[0].value,
      accessToken, // Token required if you need to interact with Google APIs on behalf of the user
    };
    done(null, user); //The returned user object is attached to the request: req.user
  }
}
