import { Type } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import  { TCListServ } from 'src/core/nfe/domain/types/complex_types/TCons/TCListServ';
import  { TCodMunIBGE } from 'src/core/nfe/domain/types/primitivies_types/TCodMunIBGE';
import  { TDec_0302a04 } from 'src/core/nfe/domain/types/primitivies_types/TDec_0302a04';
import  { TDec_1302 } from 'src/core/nfe/domain/types/primitivies_types/TDec_1302';
import  { TDec_1302Opc } from 'src/core/nfe/domain/types/primitivies_types/TDec_1302Opc';
import  { TString } from 'src/core/nfe/domain/types/primitivies_types/TString';

export class ISSQNDto {
  @IsNotEmpty({
    message: 'Valor da BC do ISSQN',
  })
  @Type(() => TDec_1302)
  vBC: TDec_1302;

  @IsNotEmpty({
    message: 'Alíquota do ISSQN',
  })
  @Type(() => TDec_0302a04)
  vAliq: TDec_0302a04;

  @IsNotEmpty({
    message: 'Valor do ISSQN',
  })
  @Type(() => TDec_1302)
  vISSQN: TDec_1302;

  @IsNotEmpty({
    message:
      'Informar o município de ocorrência do fato gerador do ISSQN. Utilizar  a Tabela do IBGE.',
  })
  @Type(() => TCodMunIBGE)
  cMunFG: TCodMunIBGE;

  @IsNotEmpty({
    message:
      'Informar o Item da lista de serviços em que se classifica o serviço',
  })
  @Type(() => TCListServ)
  cListServ: TCListServ;

  @IsOptional()
  @Type(() => TDec_1302Opc)
  vDeducao: TDec_1302Opc;

  @IsOptional()
  @Type(() => TDec_1302Opc)
  vOutro: TDec_1302Opc;

  @IsOptional()
  @Type(() => TDec_1302Opc)
  vDescIncond: TDec_1302Opc;

  @IsOptional()
  @Type(() => TDec_1302Opc)
  vDescCond: TDec_1302Opc;

  @IsOptional()
  @Type(() => TDec_1302Opc)
  vISSRet: TDec_1302Opc;

  @IsNotEmpty({
    message:
      'Exibilidade do ISS: 1-Exigível; 2-Não incidente; 3-Isenção; 4-Exportação; 5-Imunidade; 6-Exig Susp Judicial; 7-Exig Susp ADM',
  })
  @IsString()
  @IsIn(['1', '2', '3', '4', '5', '6', '7'])
  indISS: string;

  @IsOptional()
  @MinLength(1)
  @MaxLength(20)
  @Type(() => TString)
  cServico: TString;

  @IsOptional()
  @Type(() => TCodMunIBGE)
  cMun: TCodMunIBGE;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{1,4}$/)
  cPais: string;

  @IsOptional()
  @MinLength(1)
  @MaxLength(30)
  @Type(() => TString)
  nProcesso: TString;

  @IsNotEmpty({
    message: 'Indicador de Incentivo Fiscal. 1=Sim; 2=Não',
  })
  @IsString()
  @IsIn(['1', '2'])
  indIncentivo: string;
}
