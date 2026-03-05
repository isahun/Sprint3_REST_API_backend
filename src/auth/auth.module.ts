import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; // Per accedir a UsersService
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Per accedir a variables d'entorn
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule, // Necessari per utilitzar les estratègies de Passport
    JwtModule.registerAsync({
      // Configuració asíncrona per usar ConfigService
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): JwtModuleOptions => {
        const secret = configService.get<string>('JWT_SECRET');
        const expiresIn = configService.get<string>('JWT_EXPIRATION_TIME');

        if (!secret || !expiresIn) {
          throw new Error(
            'JWT_SECRET o JWT_EXPIRATION_TIME no definits al fitxer .env',
          );
        }

        return {
          secret,
          signOptions: {
            expiresIn: expiresIn as any,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // Afegeix JwtStrategy com a proveïdor
  exports: [AuthService, JwtStrategy, PassportModule], // Per si altres mòduls necessiten l'AuthService
})
export class AuthModule {}
