import { Module } from '@nestjs/common';
import { IssuerService } from './issuer.service';
import { RedisService } from 'src/resources/middlewares/is-unique-day/redis/redis.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [],
  providers: [IssuerService, PrismaService, RedisService],
  exports: [IssuerService],
})
export class IssuerInvoiceModule { }
