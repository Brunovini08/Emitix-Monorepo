import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { NfeModule } from './nfe/nfe.module';
import { CertificateController } from './certificate/certificate.controller';
import { RedisService } from './redis/redis.service';
import { IssuerInvoiceModule } from './issuer/issuer.module';
import { EmissionModule } from './emission/emission.module';

@Module({
  imports: [AuthModule, NfeModule, IssuerInvoiceModule, EmissionModule],
  controllers: [CertificateController],
  providers: [RedisService],
})
export class AppModule {}
