import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUpDto';
import { SignInDto } from './dto/signInDto';
import { Request, Response } from 'express';
import cookieParser from 'cookie-parser';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('user/signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    if (signUpDto.password !== signUpDto.confirmPass) {
      throw new BadRequestException('As senhas não coincidem', {
        cause: new Error('As senhas não coincidem'),
      });
    }
    return this.service.signUp(signUpDto);
  }

  @Post('user/signin')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    console.log({
      cookie: req.cookies,
    })
    if (req.cookies.token) {
      return res.status(400).send('Usuário já está logado');
    }
    if (!signInDto.email || !signInDto.password) {
      throw new BadRequestException('Email e senha são obrigatórios', {
        cause: new Error('Email e senha são obrigatórios'),
      });
    }
    await this.service.signIn(signInDto).then((data) => {
      res.cookie('token', data.token, { httpOnly: true });
      res.cookie('refreshToken', data.refreshToken, { httpOnly: true });
    });
    return res.status(200).send('Usuário logado');
  }

  @Post('user/signout')
  signOut(@Req() req: Request, @Res() res: Response) {
    if (req.cookies.token) {
      req.cookies.token = null;
      req.cookies.refreshToken = null;
      res.clearCookie('token');
      res.clearCookie('refreshToken');
      return res.status(200).send('Usuário deslogado');
    }
    return res.status(400).send('Usuário não está logado');
  }

  @Post('user/refreshtoken')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const refreshToken = (req.cookies as { refreshToken?: string })
      .refreshToken;
    if (!refreshToken) {
      return res.status(400).send('Refresh token não encontrado');
    }
    await this.service.refreshToken(refreshToken).then((data) => {
      res.cookie('token', data.token, { httpOnly: true });
      res.cookie('refreshToken', data.refreshToken, { httpOnly: true });
    });
    return res.status(200).send('Token atualizado');
  }
}
