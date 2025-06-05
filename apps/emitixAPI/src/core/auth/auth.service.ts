import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/resources/common/prismaConfig/prisma.service';
import { SignInDto } from './dto/signInDto';
import { SignUpDto } from './dto/signUpDto';
import {
  comparePassword,
  hashPassword,
} from 'src/resources/common/utils/auth-utils/cipher';
import { CreateToken } from 'src/resources/common/utils/auth-utils/createToken';
import { RefreshToken } from 'src/resources/common/utils/auth-utils/refreshToken';
import { verifyRefreshToken } from 'src/resources/common/utils/auth-utils/verifyRefreshToken';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(signUpDto: SignUpDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: signUpDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Usuário já existe');
    }
    try {
      const passHash = await hashPassword(signUpDto.password);
      const user = await this.prisma.user.create({
        data: {
          email: signUpDto.email,
          name: signUpDto.name,
          password: passHash,
        },
      });

      return { ...user, password: undefined };
    } catch (error) {
      throw new BadRequestException('Erro ao criar usuário');
    }
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: signInDto.email },
    });

    if (!user) {
       throw new HttpException(
              {
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Usuário não encontrado',
                error: 'Bad Request',
              },
              HttpStatus.BAD_REQUEST,
            );
    }

    const match = await comparePassword(signInDto.password, user.password);

    if (!match) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Informações inválidas',
          error: 'Bad Request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = await CreateToken({
      sub: user.id,
      username: user.name,
      email: user.email
    });

    const refreshToken = await RefreshToken({
      sub: user.id,
      username: user.name,
      email: user.email
    });

    return {
      ...user,
      token: token,
      refreshToken: refreshToken,
      password: undefined,
    };
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Refresh Token não encontrado',
          error: 'Bad Request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const token = await verifyRefreshToken(refreshToken);
    const user = await this.prisma.user.findUnique(token.email)
    if (!token) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Token inválido',
          error: 'Bad Request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const newToken = await CreateToken({
      sub: token.sub,
      username: token.username,
      email: token.email
    });
    const newRefreshToken = await RefreshToken({
      sub: token.sub,
      username: token.username,
      email: token.email
    });

    return { token: newToken, refreshToken: newRefreshToken, user: user};
  }
}
