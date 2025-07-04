import { Module } from '@nestjs/common';
import { AuthController } from './presentation/auth.controller';
import { AuthService } from './application/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './application/constants';
import { PrismaService } from 'src/shared/common/prismaConfig/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
  ],
})
export class AuthModule {}
