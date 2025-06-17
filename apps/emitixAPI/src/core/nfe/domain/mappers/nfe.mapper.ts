// src/nfe/domain/mappers/nfe.mapper.ts
import type { infNFeDto } from '../../presentation/dto/create-nfe.dto';
import { NFe } from '../entities/nfe.entity';

export class NFeMapper {
  static fromDto(dto: infNFeDto): NFe {
    return new NFe({
      ide: dto.ide,
      emit: dto.emit,
      avulsa: dto.avulsa,
      dest: dto.dest,
      retirada: dto.retirada,
      entrega: dto.entrega,
      authXML: dto.authXML,
      det: dto.det,
      total: dto.total,
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
