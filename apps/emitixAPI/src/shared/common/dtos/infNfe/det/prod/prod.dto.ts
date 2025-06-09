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
  /*Código do produto  ou serviço. Preencher com CFOP caso se trate de itens não relacionados
    com mercadorias/produtos e que o contribuinte não possua codificação própria 
    Formato "CFOP9999"
  */

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
  cBarra: TString; // Código de barras do produto, diferente do GTIN (EAN-13 ou GTIN-14)

  @IsNotEmpty({
    message: 'Descrição do produto ou serviço é obrigatória',
  })
  @MinLength(1, { message: 'xProd must be at least 1 character' })
  @MaxLength(120, { message: 'xProd must be less than 60 characters' })
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
  @IsString()
  @Matches(/^[A-Z]{2}[0-9]{4}$/)
  NVE: string; // Nomenclatura de Valor Aduaneio e Estatistico (NVE) do produto. Ex: 12345678

  @IsOptional()
  @Matches(/^[0-9]{7}$/)
  @IsString()
  CEST: string; // Código Especificador da Substituição Tributária (CEST) do produto. Ex: 1234567

  @IsOptional()
  @IsString()
  @IsIn(['S', 'N'], { message: 'indEscala must be either S or N' })
  indEscala: string; // Indicador de escala do produto. Ex: "S" (Sim) ou "N" (Não)

  @IsOptional()
  @Type(() => TCnpj)
  CNPJFab: TCnpj; // CNPJ do fabricante do produto. Ex: 12345678000195
  // Preencher com o CNPJ do fabricante, caso o produto seja fabricado por outra empresa

  @IsOptional()
  @IsString()
  @Matches(/^([!-ÿ]{8}|[!-ÿ]{10}|SEM CBENEF)?$/)
  cBenef: string; // Código do benefício fiscal. Ex: "1234567890"

  @IsOptional()
  @MinLength(0)
  @MaxLength(4)
  gCred: gCredDto;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{2, 3}$/)
  EXTIPI: string;

  @IsNotEmpty({
    message: 'CFOP, obrigatório',
  })
  @IsString()
  @Matches(/^[1,2,3,4,5,6,7]{1}[0-9]{3}$/)
  CFOP: string; // Código Fiscal de Operação e Prestação (CFOP) da operação. Ex: 5101, 6101, 6102

  @IsNotEmpty({
    message: 'Unidade comercial, obrigatória',
  })
  @MinLength(1)
  @MaxLength(6)
  @Type(() => TString)
  uCom: TString; // Unidade de medida do produto ou serviço. Ex: "UN", "KG", "LT"

  @IsNotEmpty({
    message:
      'Valor unitário de comercialização - alterado para aceitar 0 a 4 casas decimais e 11 inteiros, obrigatório',
  })
  @Type(() => TDec_1104v)
  qCom: TDec_1104v; // Quantidade do produto ou serviço. Ex: 10, 20.5, 1000

  @IsNotEmpty({
    message:
      'Valor unitário de comercialização - alterado para aceitar 0 a 10 casas decimais e 11 inteiros',
  })
  @Type(() => TDec_1110v)
  vUnCom: TDec_1110v; // Valor unitário do produto ou serviço. Ex: 10.00, 20.50, 1000.00

  @IsNotEmpty({
    message: 'Valor burto do produto ou serviço, obrigatório',
  })
  @Type(() => TDec_1302)
  vProd: TDec_1302; // Valor total do produto ou serviço. Ex: 100.00, 200.50, 1000.00

  @IsNotEmpty({
    message:
      'GTIN (Global Trade Item Number) da unidade tributável, antigo código EAN ou código de barras',
  })
  @IsString()
  @Matches(/^SEM GTIN|[0-9]{0}|[0-9]{8}|[0-9]{12,14}$/)
  cEANTrib: string; // Código de barras do produto padrão GTIN (EAN-13 ou GTIN-14) para tributação

  @IsOptional()
  @MinLength(3)
  @MaxLength(30)
  @Type(() => TString)
  cBarraTrib: TString; // Código de barras da unidade tributável diferente do pradrão GTIN

  @IsOptional()
  @MinLength(1, { message: 'uTrib must be at least 1 character' })
  @MaxLength(6, { message: 'uTrib must be less than 6 characters' })
  uTrib: string; // Unidade de medida da unidade tributável. Ex: "UN", "KG", "LT"

  @IsOptional()
  qTrib: string; // Quantidade da unidade tributável. Ex: 10, 20.5, 1000

  @IsOptional()
  vUnTrib: string; // Valor unitário da unidade tributável. Ex: 10.00, 20.50, 1000.00

  @IsOptional()
  vFrete: string; // Valor do frete do produto ou serviço. Ex: 10.00, 20.50, 1000.00

  @IsOptional()
  vSeg: string; // Valor do seguro do produto ou serviço. Ex: 10.00, 20.50, 1000.00

  @IsOptional()
  vDesc: number; // Valor do desconto do produto ou serviço. Ex: 10.00, 20.50, 1000.00

  @IsOptional()
  vOutro: number; // Valor de outros acréscimos do produto ou serviço. Ex: 10.00, 20.50, 1000.00

  @IsOptional()
  @IsIn(['0', '1'], { message: 'indTot must be either 0 or 1' })
  indTot: string; // Indicador de totalização do produto ou serviço. Ex: "0" (Não) ou "1" (Sim)

  @IsOptional()
  detExport: detExportDto;

  @IsOptional()
  @Length(1, 15)
  xPed: string; //pedido de compra - Informação de interesse do emissor para controle do B2B.

  @IsOptional()
  nItemPed: string; //Número do Item do Pedido de Compra - Identificação do número do item do pedido de Compra

  @IsOptional()
  nFCI: string; //Número de controle da FCI - Ficha de Conteúdo de Importação.

  @IsOptional()
  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(500)
  rastro: rastroDto[];

  @IsOptional()
  infProdNFF: infProdNFFDto;

  @IsOptional()
  infProdEmb: infProdEmbDto;

  @IsOptional()
  veicProd: veicProdDto; //Veículos novos

  @IsOptional()
  med: medDto;

  @IsOptional()
  @MinLength(0)
  @MaxLength(500)
  arma: armaDto[];

  @IsOptional()
  comb: combDto;

  @IsOptional()
  @Length(1, 20)
  nRECOPI: string; // Número do RECOPI
}
