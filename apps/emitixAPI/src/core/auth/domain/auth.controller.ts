import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseFilters,
} from '@nestjs/common';
import { AuthService } from '../infrastructure/auth.service';
import { SignUpDto } from '../application/dto/signUpDto';
import { SignInDto } from '../application/dto/signInDto';
import { Request, Response } from 'express';
import { HttpExceptionFilter } from '../../../shared/common/filters/http-exeception.filter'; // Assuming a common filters directory
import {ConfigService} from "@nestjs/config"

@Controller('auth')
@UseFilters(new HttpExceptionFilter()) // Apply the exception filter
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly configService: ConfigService, // Inject ConfigService
  ) { }

  @Post('user/signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    if (signUpDto.password !== signUpDto.confirmPass) {
      throw new BadRequestException('As senhas não coincidem');
    }
    // Service layer should handle the actual signup logic and potential errors
    return this.service.signUp(signUpDto);
  }

  @Post('user/signin')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response, // Use passthrough option
    @Req() req: Request,
  ) {
    if (req.cookies.token) {
      // Consider throwing an exception here for consistent error handling
      throw new BadRequestException('Usuário já está logado');
    }
    if (!signInDto.email || !signInDto.password) {
      throw new BadRequestException('Email e senha são obrigatórios');
    }

    const authData = await this.service.signIn(signInDto);

    // Refactored cookie setting logic
    this.setAuthCookies(res, authData.token, authData.refreshToken);

    return { // Let NestJS handle the response serialization
      user: {
        name: authData.name,
        email: authData.email,
        token: authData.token, // Consider if token should be returned in body
      },
    };
  }

  @Post('user/signout')
  signOut(@Res({ passthrough: true }) res: Response, @Req() req: Request) { // Use passthrough option
    if (req.cookies.token) {
      this.clearAuthCookies(res); // Refactored cookie clearing logic
      return { message: 'Usuário deslogado' }; // Let NestJS handle response
    }
    // Consider throwing an exception here for consistent error handling
    throw new BadRequestException('Usuário não está logado');
  }

  @Post('user/refreshtoken')
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response, // Use passthrough option
  ) {
    const refreshToken = req.cookies['refreshToken'] as string; // More specific type access

    if (!refreshToken) {
      throw new BadRequestException('Refresh token não encontrado');
    }

    const authData = await this.service.refreshToken(refreshToken);

    // Refactored cookie setting logic
    this.setAuthCookies(res, authData.token, authData.refreshToken);

    return { // Let NestJS handle the response serialization
      token: authData?.token,
      refreshToken: authData?.refreshToken,
      user: authData?.user,
    };
  }

  // Helper method to set authentication cookies
  private setAuthCookies(res: Response, token: string, refreshToken: string) {
    const isProduction = this.configService.get<string>('NODE_ENV') === 'production';

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: this.configService.get<number>('JWT_ACCESS_TOKEN_EXPIRATION_TIME', 3600) * 1000, // Get expiration from config with default value of 60 seconds
      secure: isProduction,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: this.configService.get<number>('JWT_REFRESH_TOKEN_EXPIRATION_TIME', 2592000) * 1000, // Get expiration from config
      secure: isProduction,
    });
  }

  // Helper method to clear authentication cookies
  private clearAuthCookies(res: Response) {
     const isProduction = this.configService.get<string>('NODE_ENV') === 'production';
     const domain = this.configService.get<string>('COOKIE_DOMAIN'); // Get domain from config

    res.clearCookie('token', { httpOnly: true, sameSite: 'lax', secure: isProduction, });
    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'lax', secure: isProduction,});
  }
}
