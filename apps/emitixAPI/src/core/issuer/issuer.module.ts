import { Global, Module } from '@nestjs/common';
import { IssuerService } from './issuer.service';
import { RedisService } from 'src/resources/middlewares/redis/redis.service';
import { PrismaService } from 'src/resources/common/prismaConfig/prisma.service';

@Global()
@Module({
  controllers: [],
  providers: [IssuerService, PrismaService, RedisService],
  exports: [IssuerService],
})
export class IssuerInvoiceModule { }
