// src/nfe/domain/mappers/nfe.mapper.ts
import type { infNFeDto } from '../../presentation/dto/create-nfe.dto';
import { NFe } from '../entities/nfe.entity';
import { AutXMLMapper } from './autXML.mapper';
import { AvulsaMapper } from './avulsa.mapper';
import { DestMapper } from './dest.mapper';
import { DetMapper } from './det/det.mapper';
import { EmitMapper } from './emit.mapper';
import { EntregaMapper } from './entrega.mapper';
import { IdeMapper } from './ide.mapper';
import { RetiradaMapper } from './retirada.mapper';
import { TotalMapper } from './total.mapper';

export class NFeMapper {
  static fromDto(dto: infNFeDto): NFe {
    return new NFe({
      ide: IdeMapper.fromDto(dto.ide),
      emit: EmitMapper.fromDto(dto.emit),
      avulsa: dto.avulsa ? AvulsaMapper.fromDto(dto.avulsa) : undefined,
      dest: dto.dest ? DestMapper.fromDto(dto.dest) : undefined,
      retirada: dto.retirada?.retirada ? RetiradaMapper.fromDto(dto.retirada.retirada) : undefined,
      entrega: dto.entrega?.entrega ? EntregaMapper.fromDto(dto.entrega.entrega) : undefined,
      authXML: Array.isArray(dto.authXML) ? dto.authXML.map(auth => AutXMLMapper.fromDto(auth)) : [],
      det: dto.det?.map(det => DetMapper.fromDto(det)) || [],
      total: TotalMapper.fromDto(dto.total),
      transp: dto.transp,
      cobr: dto.cobr,
      pag: dto.pag,
      infIntermed: dto.infIntermed,
      infAdic: dto.infAdic,
      exporta: dto.exporta,
      compra: dto.compra,
      cana: dto.cana,
      infRespTec: dto.infRespTec,
      infSolicNFF: dto.infSolicNFF,
      agropecuario: dto.agropecuario,
    });
  }
}
