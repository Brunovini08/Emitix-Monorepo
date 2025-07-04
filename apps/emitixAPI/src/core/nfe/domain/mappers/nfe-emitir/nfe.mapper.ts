// src/nfe/domain/mappers/nfe.mapper.ts
import { NFe, NFeData } from '../../entities/nfe-emitir.entity';
import type { NFeDto } from '../../types/complex_types/TNFe/NFe.dto';
import { AutXMLMapper } from './autXML.mapper';
import { AvulsaMapper } from './avulsa.mapper';
import { CobrMapper } from './cobr.mapper';
import { CompraMapper } from './compra.mapper';
import { EntregaMapper } from './entrega.mapper';
import { ExportaMapper } from './exporta.mapper';
import { IdeMapper } from './ide.mapper';
import { InfIntermedMapper } from './infIntermed.mapper';
import { InfSolicNFFMapper } from './infSolicNFF.mapper';
import { TotalMapper } from './total.mapper';
import { TranspMapper } from './transp/transp.mapper';
import { AgropecuarioMapper } from './agropecuario/agropecuario.vo.mapper';
import { CanaMapper } from './cana/cana.mapper';
import { DestMapper } from './dest/dest.mapper';
import { DetMapper } from './det/det.mapper';
import { EmitMapper } from './emit/emit.mapper';
import { InfRespTecMapper } from './infRespecTec/infRespTec.mapper';
import { PagMapper } from './pag/pag.mapper';
import { RetiradaMapper } from './retirada.mapper';
import { InfAdicMapper } from './infAdic/infAdic.mapper';

export class NFeMapper {
  static fromDto(dto: NFeDto): NFe {
    const nfeData: NFeData = {
      ide: IdeMapper.fromDto(dto.NFe.infNFe.ide),
      emit: EmitMapper.fromDto(dto.NFe.infNFe.emit),
      avulsa: dto.NFe.infNFe.avulsa ? AvulsaMapper.fromDto(dto.NFe.infNFe.avulsa) : undefined,
      dest: dto.NFe.infNFe.dest ? DestMapper.fromDto(dto.NFe.infNFe.dest) : undefined,
      retirada: dto.NFe.infNFe.retirada ? RetiradaMapper.fromDto(dto.NFe.infNFe.retirada.retirada) : undefined,
      entrega: dto.NFe.infNFe.entrega ? EntregaMapper.fromDto(dto.NFe.infNFe.entrega.entrega) : undefined,
      authXML: dto.NFe.infNFe.authXML ? dto.NFe.infNFe.authXML.map(auth => AutXMLMapper.fromDto(auth)) : [],
      det: dto.NFe.infNFe.det ? dto.NFe.infNFe.det.map(det => DetMapper.fromDto(det)) : [],
      total: TotalMapper.fromDto(dto.NFe.infNFe.total),
      transp: TranspMapper.fromDto(dto.NFe.infNFe.transp),
      cobr: dto.NFe.infNFe.cobr ? CobrMapper.fromDto(dto.NFe.infNFe.cobr) : undefined,
      pag: PagMapper.fromDto(dto.NFe.infNFe.pag),
      infIntermed: dto.NFe.infNFe.infIntermed ? InfIntermedMapper.fromDto(dto.NFe.infNFe.infIntermed) : undefined,
      infAdic: dto.NFe.infNFe.infAdic ? InfAdicMapper.fromDto(dto.NFe.infNFe.infAdic) : undefined,
      exporta: dto.NFe.infNFe.exporta ? ExportaMapper.fromDto(dto.NFe.infNFe.exporta) : undefined,
      compra: dto.NFe.infNFe.compra ? CompraMapper.fromDto(dto.NFe.infNFe.compra) : undefined,
      cana: dto.NFe.infNFe.cana ? CanaMapper.fromDto(dto.NFe.infNFe.cana) : undefined,
      infRespTec: dto.NFe.infNFe.infRespTec ? InfRespTecMapper.fromDto(dto.NFe.infNFe.infRespTec) : undefined,
      infSolicNFF: dto.NFe.infNFe.infSolicNFF ? InfSolicNFFMapper.fromDto(dto.NFe.infNFe.infSolicNFF) : undefined,
      agropecuario: dto.NFe.infNFe.agropecuario ? AgropecuarioMapper.fromDto(dto.NFe.infNFe.agropecuario) : undefined,
    };

    return new NFe(nfeData);
  }
}
