import { Global, Module } from '@nestjs/common';
import { IssuerService } from './application/issuer.service';
import { PrismaService } from 'src/shared/common/prismaConfig/prisma.service';
import { RedisService } from '../redis/application/redis.service';

@Global()
@Module({
  controllers: [],
  providers: [IssuerService, PrismaService, RedisService],
  exports: [IssuerService],
})
export class IssuerInvoiceModule { }
