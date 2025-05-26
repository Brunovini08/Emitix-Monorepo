import { Injectable, InternalServerErrorException } from '@nestjs/common';
import type ICreateIssuerInvoice from './types/issuer.type';
import { RedisService } from 'src/resources/middlewares/is-unique-day/redis/redis.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class IssuerService {
  constructor(private redis: RedisService, private prisma: PrismaService) { }
  private readonly TTL_SECONDS = 60 * 60 * 24;
  async create(createIssuerInvoiceDto: ICreateIssuerInvoice) {
    const cacheKey = `issuerInvoice:${createIssuerInvoiceDto.cnpj}`;
    const cache = await this.redis.exists(cacheKey);
    try {
      if (cache) {
        const cachedData = await this.redis.get(cacheKey);
        if (cachedData) {
          return JSON.parse(cachedData)
        }
      }
      const existingInvoice = await this.prisma.issuer.findUnique({
        where: {
          cnpj: createIssuerInvoiceDto.cnpj,
        },
      });
      if (!existingInvoice) {
        const newIssueInvoice = await this.prisma.issuer.create({
          data: {
            cnpj: createIssuerInvoiceDto.cnpj,
            razaoSocial: createIssuerInvoiceDto.razaoSocial,
            userId: createIssuerInvoiceDto.userId
          },
        })
        await this.redis.set(cacheKey, JSON.stringify(newIssueInvoice), this.TTL_SECONDS);
        return newIssueInvoice;
      }

      return existingInvoice

    } catch (error) {
      console.error('Error creating issuer invoice:', error);
      throw new InternalServerErrorException('Failed to create issuer invoice');

    }
  }

}
