import { Module } from '@nestjs/common';
import { AuthModule } from './core/auth/auth.module';
import { NfeModule } from './core/nfe/nfe.module';
import { CertificateController } from './resources/middlewares/certificate/certificate.controller';
import { RedisService } from './resources/middlewares/is-unique-day/redis/redis.service';
import { IssuerInvoiceModule } from './core/issuer/issuer.module';
import { EmissionModule } from './resources/middlewares/emission/emission.module';
import { NotasModule } from './resources/middlewares/nota/nota.module';

@Module({
  imports: [AuthModule, NfeModule, IssuerInvoiceModule, EmissionModule, NotasModule],
  controllers: [CertificateController],
  providers: [RedisService],
})
export class AppModule {}
