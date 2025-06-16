import { Global, Module } from '@nestjs/common';
import { EmissionService } from './application/emission.service';
import { PrismaModule } from 'src/shared/common/prismaConfig/prisma.module';

@Global()
@Module({
  controllers: [],
  providers: [EmissionService],
  exports: [EmissionService],
  imports: [PrismaModule]
})
export class EmissionModule {}
