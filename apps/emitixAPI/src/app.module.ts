import { Module } from '@nestjs/common';
import { AuthModule } from './core/auth/infrastructure/auth.module';
import { NfeModule } from './core/nfe/nfe.module';

import { ConfigModule } from '@nestjs/config';
import { CertificateController } from './core/certificate/certificate.controller';
import { EmissionModule } from './core/emission/emission.module';
import { IssuerInvoiceModule } from './core/issuer/issuer.module';
import { RedisService } from './core/redis/application/redis.service';
import { PrismaModule } from './shared/common/prismaConfig/prisma.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [AuthModule, NfeModule, IssuerInvoiceModule, EmissionModule, PrismaModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
  }), LoggerModule.forRoot({
    pinoHttp: {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          singleLine: true,
          translateTime: 'SYS:standard',
        },
      },
      serializers: {
        req(req) {
          return {
            method: req.method,
            url: req.url,
            params: req.params,
            query: req.query,
            body: req.body,
            // headers NÃO incluídos
          }
        }
      }
    }
  })
  ],
  controllers: [CertificateController],
  providers: [RedisService],
})
export class AppModule { }
