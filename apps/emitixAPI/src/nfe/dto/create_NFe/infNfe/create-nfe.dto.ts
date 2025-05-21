import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  Equals,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { agropecuarioDto } from './agropecuario/agropecuario.dto';
import { autXMLDto } from './autXML/autXML.dto';
import { avulsaDto } from './avulsa/avulsa.dto';
import { canaDto } from './cana/cana.dto';
import { cobrDto } from './cobr/cobr.dto';
import { compraDto } from './det/compra/compra.dto';
import { destDto } from './det/dest/dest.dto';
import { detDto } from './det/det.dto';
import { emitDto } from './emit/emit.dto';
import { entregaDto } from './entrega/entrega.dto';
import { exportaDto } from './exporta/exporta.dto';
import { ideDto } from './ide/ide.dto';
import { infAdicDto } from './infAdic/infAdic.dto';
import { infIntermedDto } from './infIntermed/infIntermed.dto';
import { infRespTecDto } from './infRespTec/infRespTec.dto';
import { infSolicNFFDto } from './infSolicNFF/infSolicNFF.dto';
import { pagDto } from './pag/pag.dto';
import { retiradaDto } from './retirada/retirada.dto';
import { totalDto } from './total/total.dto';
import { transpDto } from './transp/transp.dto';

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
