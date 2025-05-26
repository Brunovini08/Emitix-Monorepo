import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SignInDto } from './dto/signInDto';
import { SignUpDto } from './dto/signUpDto';
import {
  comparePassword,
  hashPassword,
} from 'src/resources/common/utils/auth-utils/cipher';
import { CreateToken } from 'src/resources/common/utils/auth-utils/createToken';
import { RefreshToken } from 'src/resources/common/utils/auth-utils/refreshToken';
import { verifyRefreshToken } from 'src/resources/common/utils/auth-utils/verifyRefreshToken';
import { RedisService } from 'src/resources/middlewares/is-unique-day/redis/redis.service';
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
      throw new NotFoundException('Usuário não encontrado');
    }

    const match = await comparePassword(signInDto.password, user.password);

    if (!match) {
      throw new BadRequestException('Informações inválidas');
    }

    const token = await CreateToken({
      sub: user.id,
      username: user.name,
    });

    const refreshToken = await RefreshToken({
      sub: user.id,
      username: user.name,
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
      throw new NotFoundException('Refresh token não encontrado');
    }
    const token = await verifyRefreshToken(refreshToken);
    if (!token) {
      throw new HttpException('Token inválido', 498);
    }
    const newToken = await CreateToken({
      sub: token.sub,
      username: token.username,
    });
    const newRefreshToken = await RefreshToken({
      sub: token.sub,
      username: token.username,
    });

    return { token: newToken, refreshToken: newRefreshToken };
  }
}
