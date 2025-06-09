import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
  Length,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import  { TAmb } from 'src/core/nfe/domain/types/primitivies_types/TAmb';
import  { TCodMunIBGE } from 'src/core/nfe/domain/types/primitivies_types/TCodMunIBGE';
import { TCodUfIBGE } from 'src/core/nfe/domain/types/primitivies_types/TCodUfIBGE';
import  { TDateTimeUTC } from 'src/core/nfe/domain/types/primitivies_types/TDateTimeUTC';
import  { TMod } from 'src/core/nfe/domain/types/primitivies_types/TMod';
import  { TNF } from 'src/core/nfe/domain/types/primitivies_types/TNF';
import  { TSerie } from 'src/core/nfe/domain/types/primitivies_types/TSerie';
import  { TString } from 'src/core/nfe/domain/types/primitivies_types/TString';
import  { NFrefDto } from './NFref/NFref.dto';

export class ideDto {
  @IsOptional()
  @Type(() => TCodUfIBGE)
  cUF: TCodUfIBGE; // Código da UF do emitente. Ex: 35=SP, 33=RJ, etc.

  @IsNotEmpty({ message: 'natOp is required' })
  @MinLength(1)
  @MaxLength(60)
  @Type(() => TString)
  natOp: TString; // Descrição da operação. Ex: Venda, Devolução, etc.

  @IsNotEmpty({ message: 'mod is required' })
  @Type(() => TMod)
  mod: TMod; // Modelo do documento fiscal. Ex: 55=NF-e, 65=NFC-e, etc.

  @IsNotEmpty({ message: 'serie is required' })
  @Type(() => TSerie)
  @Matches(/^0$|^[1-9]\d{0,2}$/, {
    message: 'A série deve ser 0 ou entre 1 e 999, sem zeros à esquerda',
  })
  @Length(3)
  serie: TSerie;

  @IsNotEmpty({ message: 'nNF is required' })
  @Type(() => TNF)
  nNF: TNF; // Número da NF-e. O número deve ser gerado aleatoriamente e deve ser único para cada NF-e emitida.

  @IsNotEmpty({ message: 'dhEmi is required' })
  @Type(() => TDateTimeUTC)
  dhEmi: TDateTimeUTC; // Data e hora de emissão da NF-e. O formato deve ser UTC (Coordinated Universal Time). Ex: 2023-10-01T12:00:00Z

  @IsOptional()
  @Type(() => TDateTimeUTC)
  dhSaiEnt: TDateTimeUTC; // Data e hora de saída ou entrada da NF-e. O formato deve ser UTC (Coordinated Universal Time). Ex: 2023-10-01T12:00:00Z

  @IsNotEmpty({ message: 'tpNF is required' })
  @IsIn(['0', '1'], { message: 'tpNF must be either 0 (Entrada) or 1 (Saída)' })
  tpNF: string;

  @IsNotEmpty({ message: 'idDest is required' })
  @IsIn(['1', '2', '3'], {
    message:
      'idDest must be either 1 (Operação interna), 2 (Operação interestadual), or 3 (Operação com exterior)',
  })
  idDest: string; // 1=Operação interna; 2=Operação interestadual; 3=Operação com exterior

  @IsNotEmpty({ message: 'cMunFG is required' })
  @Type(() => TCodMunIBGE)
  cMunFG: TCodMunIBGE;

  @IsNotEmpty({ message: 'tpImp is required' })
  @IsIn(['0', '1', '2', '3', '4', '5'], {
    message: 'tpImp must be a valid value',
  })
  tpImp: string;
  // 0=sem DANFE; 1=DANFe Retrato; 2=DANFe Paisagem
  // 3=DANFe Simplificado; 4=DANFe NFC-e; 5=DANFe NFC-e e mensagem eletrônica

  @IsNotEmpty({ message: 'tpEmis is required' })
  @IsIn(['1', '2', '3', '4', '5', '6', '7', '8', '9'], {
    message: 'tpEmis must be a valid value',
  })
  tpEmis: string;
  // 1=Emissão normal; 2=Contingência FS;
  // 3=Regime Especial NFF; 4=Contingência DPEC;
  // 5=Contingência FSDA; 6=Contingência SVC-AN;
  // 7=Contingência SVC-RS; 9=Contingência off-line NFC-e

  @IsOptional()
  cDV: string; // Dígito verificador da chave de acesso da NF-e.

  @IsNotEmpty({ message: 'tpAmb is required' })
  @Type(() => TAmb)
  tpAmb: TAmb; // 1=Produção; 2=Homologação

  @IsNotEmpty({ message: 'finNFe is required' })
  @IsIn(['1', '2', '3', '4'], {
    message:
      'finNFe must be a valid value: Finalidade da emissão da NF-e = 1; NFe normal = 2; NFe complementar = 3; NFe de ajuste 4 - Devolução/Retorno',
  })
  finNFe: string; // 1=NF-e normal; 2=NF-e complementar; 3=NF-e de ajuste; 4=NF-e de devolução

  @IsNotEmpty({ message: 'indFinal is required' })
  @IsIn(['0', '1'], {
    message: 'indFinal must be either 0 (Normal) or 1 (Consumidor final)',
  })
  indFinal: string; // 0=Normal; 1=Consumidor final

  @IsNotEmpty({ message: 'indPres is required' })
  @IsIn(['0', '1', '2', '3', '4', '5', '9'], {
    message:
      'indPres must be a valid value: Indicador de presença do comprador no estabelecimento comercial no momento da oepração(0- Não se aplica(ex.: Nota Fiscal complementar ou de ajuste; 1-Operação presencial; 2 - Não presencial, internet; 3 - Não presencial, teleatendimento; 4 - NFC - e entrega em domicílio; 5 - Operação presencial, fora do estabelecimento;9 - Não presencial, outros) ',
  })
  indPres: string; // 0=Não se aplica; 1=Presencial; 2=Não presencial; 3=Internet; 4=Telefone; 5=Fax; 9=Outros

  @IsOptional()
  @IsIn(['0', '1'], {
    message:
      'indIntermed must be either 0 or 1: Indicador de intermediador/marketplace 0=Operação sem intermediador (em site ou plataforma própria) 1=Operação em site ou plataforma de terceiros (intermediadores/marketplace)',
  })
  indIntermed: string; // 0=Normal; 1=Intermediário

  @IsNotEmpty({ message: 'procEmi is required' })
  @IsIn(['0', '1', '2'], {
    message:
      'procEmi must be a valid value: Processo de emissão utilizado com a seguinte codificação: 0 - emissão de NF-e com aplicativo do contribuinte; 1 - emissão de NF-e avulsa pelo Fisco; 2 - emissão de NF-e avulsa, pelo contribuinte com seu certificado digital, através do site do Fisco; 3- emissão de NF-e pelo contribuinte com aplicativo fornecido pelo Fisco.',
  })
  procEmi: string; // 0=Aplicativo do contribuinte; 1=Aplicativo da SEF; 2=Aplicativo de terceiros; 3=Aplicativo do contribuinte com aplicativo da sefaz

  @IsNotEmpty({ message: 'verProc is required' })
  @Type(() => TString)
  @MinLength(1)
  @MaxLength(20)
  verProc: TString;

  @ValidateIf((o) => o.tpEmis !== 1)
  @IsOptional({ message: 'Informar apenas para tpEmis diferente de 1' })
  @Type(() => TDateTimeUTC)
  dhCont: TDateTimeUTC;

  @ValidateIf((o) => o.tpEmis !== 1)
  @IsOptional()
  @MinLength(15)
  @MaxLength(255)
  @Type(() => TString)
  xJust: TString;

  @ValidateIf((o) => o.tpEmis !== 1)
  @IsOptional()
  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(999)
  @ValidateNested()
  @Type(() => NFrefDto)
  NFref: NFrefDto[];
}
