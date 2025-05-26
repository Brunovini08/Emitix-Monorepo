import { Module } from '@nestjs/common';
import { EmissionService } from './emission.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [],
  providers: [EmissionService, PrismaService],
  exports: [EmissionService],
})
export class EmissionModule {}
