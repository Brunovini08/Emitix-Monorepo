import { Module } from '@nestjs/common';
import { AuthModule } from './core/auth/infrastructure/auth.module';
import { NfeModule } from './core/nfe/nfe.module';

import { NfceModule } from './core/nfce/nfce.module';
import { ConfigModule } from '@nestjs/config';
import { CertificateController } from './core/certificate/certificate.controller';
import { EmissionModule } from './core/emission/emission.module';
import { IssuerInvoiceModule } from './core/issuer/issuer.module';
import { NotasModule } from './core/nota/nota.module';
import { RedisService } from './core/redis/application/redis.service';
import { PrismaModule } from './shared/common/prismaConfig/prisma.module';

@Module({
  imports: [AuthModule, NfeModule, NfceModule, IssuerInvoiceModule, EmissionModule, NotasModule, PrismaModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
  })],
  controllers: [CertificateController],
  providers: [RedisService],
})
export class AppModule {}
