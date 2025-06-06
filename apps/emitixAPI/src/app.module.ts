import { Module } from '@nestjs/common';
import { AuthModule } from './core/auth/auth.module';
import { NfeModule } from './core/nfe/nfe.module';
import { CertificateController } from './resources/middlewares/certificate/certificate.controller';
import { RedisService } from './resources/middlewares/redis/redis.service';
import { IssuerInvoiceModule } from './core/issuer/issuer.module';
import { EmissionModule } from './resources/middlewares/emission/emission.module';
import { NotasModule } from './resources/middlewares/nota/nota.module';
import { PrismaModule } from './resources/common/prismaConfig/prisma.module';
import { NfceModule } from './core/nfce/nfce.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, NfeModule, NfceModule, IssuerInvoiceModule, EmissionModule, NotasModule, PrismaModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
  })],
  controllers: [CertificateController],
  providers: [RedisService],
})
export class AppModule {}
