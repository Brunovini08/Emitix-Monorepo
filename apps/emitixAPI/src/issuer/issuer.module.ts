import { Module } from '@nestjs/common';
import { IssuerService } from './issuer.service';
import { RedisService } from 'src/redis/redis.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [],
  providers: [IssuerService, RedisService, PrismaService],
  exports: [IssuerService],
})
export class IssuerInvoiceModule {}
