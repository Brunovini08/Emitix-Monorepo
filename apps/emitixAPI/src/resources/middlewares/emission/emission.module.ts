import { Global, Module } from '@nestjs/common';
import { EmissionService } from './emission.service';
import { PrismaService } from 'src/resources/common/prismaConfig/prisma.service';

@Global()
@Module({
  controllers: [],
  providers: [EmissionService, PrismaService],
  exports: [EmissionService],
})
export class EmissionModule {}
