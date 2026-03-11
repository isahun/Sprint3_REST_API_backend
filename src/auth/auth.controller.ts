import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto, LoginUserDto } from './dto/auth.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { type Request } from 'express';

@ApiTags('Autenticació') // Agrupa les rutes a Swagger
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registra un nou usuari' })
  @ApiBody({ type: RegisterUserDto })
  @ApiResponse({ status: 201, description: 'Usuari registrat correctament' })
  @ApiResponse({ status: 409, description: "Nom d'usuari ja existent" })
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async register(@Body() registerDto: RegisterUserDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Inicia sessió i obté un JWT' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    status: 200,
    description: 'Login correcte',
    schema: { example: { access_token: 'eyJhbGciOiJIUzI1Ni...' } },
  })
  @ApiResponse({ status: 401, description: 'Credencials invàlides' })
  @HttpCode(HttpStatus.OK) // Retorna explícitament 200 OK
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }

  //Route to initiate the Google OAuth flow.
  //The AuthGuard('google') automatically redirects the user to Google's login page.
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // This route is handled by Passport; no additional code is needed here.
    // We don't need the '_req' here because the Guard handles the redirection.
    //Underscore is a convention for acknowledging unused variables that we want to keep in the code
  }

  //Callback route where Google redirects user after authentication
  //Passport processes the data and attaches user profile to req.user
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request) {
    // Return the user data received from Google (from our strategy's validate method)
    return {
      message: 'User authenticated via Google successfully',
      user: req.user,
    };
  }
}
