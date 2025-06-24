import { Module } from '@nestjs/common';
import { AuthModule } from './core/auth/infrastructure/auth.module';
import { NfeModule } from './core/nfe/nfe.module';

import { ConfigModule } from '@nestjs/config';
import { CertificateController } from './core/certificate/certificate.controller';
import { EmissionModule } from './core/emission/emission.module';
import { IssuerInvoiceModule } from './core/issuer/issuer.module';
import { RedisService } from './core/redis/application/redis.service';
import { PrismaModule } from './shared/common/prismaConfig/prisma.module';

@Module({
  imports: [AuthModule, NfeModule, IssuerInvoiceModule, EmissionModule, PrismaModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
  })],
  controllers: [CertificateController],
  providers: [RedisService],
})
export class AppModule {}
