import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsOptional,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { agropecuarioDto } from '../../../resources/common/dtos/infNfe/agropecuario/agropecuario.dto';
import { autXMLDto } from '../../../resources/common/dtos/infNfe/autXML/autXML.dto';
import { avulsaDto } from '../../../resources/common/dtos/infNfe/avulsa/avulsa.dto';
import { canaDto } from '../../../resources/common/dtos/infNfe/cana/cana.dto';
import { cobrDto } from '../../../resources/common/dtos/infNfe/cobr/cobr.dto';
import { compraDto } from '../../../resources/common/dtos/infNfe/det/compra/compra.dto';
import { destDto } from '../../../resources/common/dtos/infNfe/det/dest/dest.dto';
import { detDto } from '../../../resources/common/dtos/infNfe/det/det.dto';
import { emitDto } from '../../../resources/common/dtos/infNfe/emit/emit.dto';
import { entregaDto } from '../../../resources/common/dtos/infNfe/entrega/entrega.dto';
import { exportaDto } from '../../../resources/common/dtos/infNfe/exporta/exporta.dto';
import { ideDto } from '../../../resources/common/dtos/infNfe/ide/ide.dto';
import { infAdicDto } from '../../../resources/common/dtos/infNfe/infAdic/infAdic.dto';
import { infIntermedDto } from '../../../resources/common/dtos/infNfe/infIntermed/infIntermed.dto';
import { infRespTecDto } from '../../../resources/common/dtos/infNfe/infRespTec/infRespTec.dto';
import { infSolicNFFDto } from '../../../resources/common/dtos/infNfe/infSolicNFF/infSolicNFF.dto';
import { pagDto } from '../../../resources/common/dtos/infNfe/pag/pag.dto';
import { retiradaDto } from '../../../resources/common/dtos/infNfe/retirada/retirada.dto';
import { totalDto } from '../../../resources/common/dtos/infNfe/total/total.dto';
import { transpDto } from '../../../resources/common/dtos/infNfe/transp/transp.dto';

export class infNFeDto {
  @ValidateNested()
  @Type(() => ideDto)
  ide: ideDto;

  @ValidateNested()
  @Type(() => emitDto)
  emit: emitDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => avulsaDto)
  avulsa: avulsaDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => destDto)
  dest: destDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => retiradaDto)
  retirada: retiradaDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => entregaDto)
  entrega: entregaDto;

  @IsOptional()
  @MinLength(0)
  @MaxLength(10)
  @ValidateNested()
  @Type(() => autXMLDto)
  authXML: autXMLDto;

  @IsArray()
  @ArrayMaxSize(990)
  @ValidateNested({ each: true })
  @Type(() => detDto)
  det: detDto[];

  @ValidateNested()
  @Type(() => totalDto)
  total: totalDto;

  @ValidateNested()
  @Type(() => transpDto)
  transp: transpDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => cobrDto)
  cobr: cobrDto;

  @ValidateNested()
  @Type(() => pagDto)
  pag: pagDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => infIntermedDto)
  infIntermed: infIntermedDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => infAdicDto)
  infAdic: infAdicDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => exportaDto)
  exporta: exportaDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => compraDto)
  compra: compraDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => canaDto)
  cana: canaDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => infRespTecDto)
  infRespTec: infRespTecDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => infSolicNFFDto)
  infSolicNFF: infSolicNFFDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => agropecuarioDto)
  agropecuario: agropecuarioDto;
  
}
