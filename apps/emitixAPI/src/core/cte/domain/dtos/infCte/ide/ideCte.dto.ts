import { Type } from "class-transformer";
import { Equals, IsIn, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { TCfop } from "src/core/cte/domain/types/TCfop";
import { TFinCTe } from "src/core/cte/domain/types/TFinCTe";
import { TProcEmi } from "src/core/cte/domain/types/TProcEmi";
import  { TAmb } from "src/core/nfe/domain/types/primitivies_types/TAmb";
import  { TCodUfIBGE } from "src/core/nfe/domain/types/primitivies_types/TCodUfIBGE";
import  { TDateTimeUTC } from "src/core/nfe/domain/types/primitivies_types/TDateTimeUTC";
import  { TNF } from "src/core/nfe/domain/types/primitivies_types/TNF";
import  { TSerie } from "src/core/nfe/domain/types/primitivies_types/TSerie";
import  { TString } from "src/core/nfe/domain/types/primitivies_types/TString";

export class ideCteDto {
  @IsNotEmpty({
    message: 'Código da UF do emitente do CT-e é obrigatório'
  })
  @Type(() => TCodUfIBGE)
  cUF: TCodUfIBGE

  @IsNotEmpty({
    message: 'Código númerico que compõe a Chave de Acesso é obrigatório'
  })
  @Matches(/^[0-9]{8}$/)
  @IsString()
  cCT: string

  @IsNotEmpty({
    message: 'Código Fiscal deOperações e Prestações é obrigatório'
  })
  @Type(() => TCfop)
  CFOP: TCfop

  @IsNotEmpty({
    message: 'Natureza da Operação é obrigatória'
  })
  @Type(() => TString)
  @MinLength(1)
  @MaxLength(60)
  natOp: TString

  @IsNotEmpty({
    message: 'Modelo do documento fiscal é obrigatório'
  })
  @Equals('57')
  mod: string

  @IsNotEmpty({
    message: 'Série do CT-e é obrigatório'
  })
  @Type(() => TSerie)
  serie: TSerie

  @IsNotEmpty({
    message: 'Número do CT-e é obrigatório'
  })
  @Type(() => TNF)
  nCT: TNF

  @IsNotEmpty({
    message: 'Data e hora de emissão do CT-e é obrigatório'
  })
  @Type(() => TDateTimeUTC)
  dhEmi: TDateTimeUTC

  @IsNotEmpty({
    message: 'Formato de impressão do DACTE é obrigatório'
  })
  @IsString()
  @IsIn(['1', '2'])
  tpImp: string

  @IsNotEmpty({
    message: 'Forma de emissão do CT-e é obrigatório'
  })
  @IsIn(['1', '3', '4', '5', '7', '8'], {
    message:
      `
    Preencher com: 
    1 - Normal;
    3 - Regime Especial NFF.
    4 - EPEC pela SVC;
    5 - Contingência FSDA;
    7 - Autorização pela SVC-RS;
    8 - Autorização pela SVC-SP
    `
  })
  tpEmis: string

  @IsNotEmpty({
    message: 'Tipo do Ambiente'
  })
  @Type(() => TAmb)
  @IsIn(['1', '2'], {
    message: 'Preencher com: 1 - Produção; 2 - Homologação.'
  })
  tpAmb: TAmb

  @IsNotEmpty({
    message: 'Tipo do CT-e é obrigatório'
  })
  @Type(() => TFinCTe)
  tpCTe: TFinCTe

  @IsNotEmpty()
  @IsIn(['0', '3'])
  @Type(() => TProcEmi)
  procEmi: TProcEmi

  @IsNotEmpty({
    message: 'Versão do processo de emissão é obrigatório'
  })
  @MinLength(1)
  @MaxLength(20)
  @Type(() => TString)
  verProc: TString
}