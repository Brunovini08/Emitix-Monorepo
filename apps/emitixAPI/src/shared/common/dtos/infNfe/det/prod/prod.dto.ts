import {
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
  IsIn,
  Length,
  Matches,
  IsString,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  ValidateNested,
} from 'class-validator';
import { combDto } from './comb/comb.dto';
import { detExportDto } from './detExport/detExport.dto';
import { gCredDto } from './gCred/gCred.dto';
import { infProdEmbDto } from './infProdEmb/infProdEmb.dto';
import { infProdNFFDto } from './infProdNFF/infProdNFF.dto';
import { rastroDto } from './rastro/rastro.dto';
import { veicProdDto } from './veicProd/veicProd.dto';
import { Type } from 'class-transformer';
import  { medDto } from './med/med.dto';
import  { armaDto } from './arma/arma.dto';
import  { TCnpj } from 'src/core/nfe/domain/types/primitivies_types/TCnpj';
import  { TDec_1104v } from 'src/core/nfe/domain/types/primitivies_types/TDec_1104v';
import  { TDec_1110v } from 'src/core/nfe/domain/types/primitivies_types/TDec_1110v';
import  { TDec_1302 } from 'src/core/nfe/domain/types/primitivies_types/TDec_1302';
import  { TString } from 'src/core/nfe/domain/types/primitivies_types/TString';

export class prodDto {
  @IsNotEmpty({
    message:
      'Código do produto ou serviço. Preencher com CFOP caso se trate de itens nao relacionados com mercadorias/produto e que o contribuinte não possua codificação própria Formato CFOP9999',
  })
  @MinLength(1)
  @MaxLength(60)
  @Type(() => TString)
  cProd: TString;

  @IsNotEmpty({
    message:
      'GTIN (Global Trade Item Number) do produto, antigo código de barras',
  })
  @Matches(/^SEM GTIN|[0-9]{0}|[0-9]{8}|[0-9]{12,14}$/)
  cEAN: string;

  @IsOptional()
  @MinLength(3, {
    message:
      'Codigo de barras diferente do padrão GTIN deve ter no mínimo 3 caracteres',
  })
  @MaxLength(30, {
    message:
      'Codigo de barras diferente do padrão deve ter no máximo 30 caracteres',
  })
  @Type(() => TString)
  cBarra: TString;

  @IsNotEmpty({
    message: 'Descrição do produto ou serviço é obrigatória',
  })
  @MinLength(1, { message: 'xProd must be at least 1 character' })
  @MaxLength(120, { message: 'xProd must be less than 120 characters' })
  @Type(() => TString)
  xProd: TString;

  @IsString()
  @IsNotEmpty({
    message:
      'Código NCM (8 posições), será permitida a informação do gênero (posição do capítulo do NCM) quando a operação não for de comércio exterios (importação/exportação) ou o produto não seja tributado pelo IPI. Em caso de item de serviço ou item que não tenham produto (Ex. tranferência de crédito, crédito do ativo imobilizado, etc.), informar o código 00 (zeros)',
  })
  @Matches(/^[0-9]{2}|[0-9]{8}$/)
  NCM: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(8)
  @IsString({ each: true })
  @Matches(/^[A-Z]{2}[0-9]{4}$/, { each: true })
  NVE: string[];

  @IsOptional()
  @Matches(/^[0-9]{7}$/)
  @IsString()
  CEST: string;

  @IsOptional()
  @IsString()
  @IsIn(['S', 'N'], { message: 'indEscala must be either S or N' })
  indEscala: string;

  @IsOptional()
  @Type(() => TCnpj)
  CNPJFab: TCnpj;

  @IsOptional()
  @IsString()
  @Matches(/^([!-ÿ]{8}|[!-ÿ]{10}|SEM CBENEF)?$/)
  cBenef: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(4)
  @ValidateNested({ each: true })
  @Type(() => gCredDto)
  gCred: gCredDto[];

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{2,3}$/)
  EXTIPI: string;

  @IsNotEmpty({
    message: 'CFOP, obrigatório',
  })
  @IsString()
  @Matches(/^[1-7]{1}[0-9]{3}$/)
  CFOP: string;

  @IsNotEmpty({
    message: 'Unidade comercial, obrigatória',
  })
  @MinLength(1)
  @MaxLength(6)
  @Type(() => TString)
  uCom: TString;

  @IsNotEmpty({
    message:
      'Quantidade comercial - alterado para aceitar 0 a 4 casas decimais e 11 inteiros, obrigatório',
  })
  @Type(() => TDec_1104v)
  qCom: TDec_1104v;

  @IsNotEmpty({
    message:
      'Valor unitário de comercialização - alterado para aceitar 0 a 10 casas decimais e 11 inteiros',
  })
  @Type(() => TDec_1110v)
  vUnCom: TDec_1110v;

  @IsNotEmpty({
    message: 'Valor bruto do produto ou serviço, obrigatório',
  })
  @Type(() => TDec_1302)
  vProd: TDec_1302;

  @IsNotEmpty({
    message:
      'GTIN (Global Trade Item Number) da unidade tributável, antigo código EAN ou código de barras',
  })
  @IsString()
  @Matches(/^SEM GTIN|[0-9]{0}|[0-9]{8}|[0-9]{12,14}$/)
  cEANTrib: string;

  @IsOptional()
  @MinLength(3)
  @MaxLength(30)
  @Type(() => TString)
  cBarraTrib: TString;

  @IsNotEmpty({
    message: 'Unidade tributável, obrigatória',
  })
  @MinLength(1, { message: 'uTrib must be at least 1 character' })
  @MaxLength(6, { message: 'uTrib must be less than 6 characters' })
  uTrib: string;

  @IsNotEmpty({
    message: 'Quantidade tributável, obrigatória',
  })
  @Type(() => TDec_1104v)
  qTrib: TDec_1104v;

  @IsNotEmpty({
    message: 'Valor unitário tributável, obrigatório',
  })
  @Type(() => TDec_1110v)
  vUnTrib: TDec_1110v;

  @IsOptional()
  @Type(() => TDec_1302)
  vFrete: TDec_1302;

  @IsOptional()
  @Type(() => TDec_1302)
  vSeg: TDec_1302;

  @IsOptional()
  @Type(() => TDec_1302)
  vDesc: TDec_1302;

  @IsOptional()
  @Type(() => TDec_1302)
  vOutro: TDec_1302;

  @IsNotEmpty({
    message: 'Indicador de totalização é obrigatório',
  })
  @IsIn(['0', '1'], { message: 'indTot must be either 0 or 1' })
  indTot: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => detExportDto)
  detExport: detExportDto;

  @IsOptional()
  @Length(1, 15)
  xPed: string;

  @IsOptional()
  @Matches(/^[0-9]{1,6}$/)
  nItemPed: string;

  @IsOptional()
  @Length(36, 36)
  nFCI: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(500)
  @ValidateNested({ each: true })
  @Type(() => rastroDto)
  rastro: rastroDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => infProdNFFDto)
  infProdNFF: infProdNFFDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => infProdEmbDto)
  infProdEmb: infProdEmbDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => veicProdDto)
  veicProd: veicProdDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => medDto)
  med: medDto;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(500)
  @ValidateNested({ each: true })
  @Type(() => armaDto)
  arma: armaDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => combDto)
  comb: combDto;

  @IsOptional()
  @Length(1, 20)
  nRECOPI: string;
}
