import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { TCodMunIBGE } from 'src/core/nfe/domain/types/primitivies_types/TCodMunIBGE';
import { TCodUfIBGE } from 'src/core/nfe/domain/types/primitivies_types/TCodUfIBGE';
import { TDec_0302a04 } from 'src/core/nfe/domain/types/primitivies_types/TDec_0302a04';
import { TDec_1302 } from 'src/core/nfe/domain/types/primitivies_types/TDec_1302';

export class retTranspDto {
  @IsNotEmpty({
    message: 'Valor do Serviço',
  })
  @Type(() => TDec_1302)
  vServ: TDec_1302;

  @IsNotEmpty({
    message: 'BC da Retenção do ICMS',
  })
  @Type(() => TDec_1302)
  vBCRet: TDec_1302;

  @IsNotEmpty({
    message: 'Valor do ICMS Retido',
  })
  @Type(() => TDec_0302a04)
  pICMSRet: TDec_0302a04;

  @IsNotEmpty({
    message: 'Valor do ICMS Retido',
  })
  @Type(() => TDec_1302)
  vICMSRet: TDec_1302;

  @IsNotEmpty({
    message: 'Código Fiscal de Operações e Prestações',
  })
  @IsString()
  @Matches(/^[1,2,3,4,5,6,7{1}[0-9]{3}]$/)
  CFOP: string;

  @IsNotEmpty({
    message:
      'Código do Município de Ocorrência do Fato Gerador (utilizar a tabalea do IBGE)',
  })
  @Type(() => TCodMunIBGE)
  cMunFG: TCodUfIBGE;
}
