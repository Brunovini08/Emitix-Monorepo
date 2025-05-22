import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import type ICreateEmission from './types/emission.type';
import { PrismaService } from 'src/prisma.service';
import { EmissionType } from '@prisma/client';

@Injectable()
export class EmissionService {
  constructor(private prisma: PrismaService) { }

  async create(createEmissionDto: ICreateEmission) {
    if (!createEmissionDto || !createEmissionDto.chaveAcesso) throw new BadRequestException('Todas as informações são obrigatórias para criar um novo registro')
    const { chaveAcesso } = createEmissionDto;
    const existAcessKey = await this.prisma.emission.findUnique({
      where: {
        chaveAcesso,
      }
    })
    if (existAcessKey) {
      if (existAcessKey.status === createEmissionDto.status) {
        throw new ConflictException('A chave de acesso já existe com o mesmo status')
      } else {
        return await this.prisma.emission.update({
          where: {
            chaveAcesso,
          },
          data: {
            status: createEmissionDto.status,
            xml: createEmissionDto.xml,
          }
        })
      }
    }
    const emission = await this.prisma.emission.create({
      data: {
        chaveAcesso: chaveAcesso,
        xml: createEmissionDto.xml,
        type: createEmissionDto.emissionType as EmissionType,
        dataEmissao: createEmissionDto.dataEmissao,
        numeroDocumento: createEmissionDto.numeroDocumento,
        pdf: createEmissionDto.pdf,
        status: createEmissionDto.status,
        uf: createEmissionDto.uf,
        valor: createEmissionDto.valor,
        issuer: {
          connect: {
            id: createEmissionDto.issueId
          }
        }
      }
    })
    return emission;

  }
}
