import { Type } from 'class-transformer';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TDec_0302a04 } from 'src/nfe/reusable/types/primitivies_types/TDec_0302a04';
import { TDec_1302 } from 'src/nfe/reusable/types/primitivies_types/TDec_1302';

export class icmsUfDestDto {
  @IsNotEmpty({
    message: 'Valor da Base de Cáculo do ICMS na UF do destinatário.',
  })
  @Type(() => TDec_1302)
  vBCUFDest: TDec_1302;

  @IsOptional() // Valor da Base de Cálculo do FCP na UF do destinatário
  @Type(() => TDec_1302)
  vBCFCPUFDest: TDec_1302;

  @IsOptional() // Percentual adicional inserido na alíquota interna da UF de destino, relativo ao Fundo de Combate à Pobreza (FCP) naquela UF;
  @Type(() => TDec_0302a04)
  pFCPUFDest: TDec_0302a04;

  @IsNotEmpty({
    message:
      'Alíquota adotada nas operações internas na UF do destinatário para o produto / mercadoria',
  })
  @Type(() => TDec_0302a04)
  pICMSUFDest: TDec_0302a04;

  @IsNotEmpty({
    message: `
      Alíquota interestadual das UF envolvidas: 
      - 4.00% alíquota interestadual para produtos importados;
      - 7.00% para os Estados de origem do SUl e Sudeste (exceto ES),  destinado para os Estadados do Norte e Nordeste ou ES;
      - 12.00% para os demais casos.
    `,
  })
  @IsString()
  @IsIn(['4.00', '7.00', '12.00'], {
    message:
      'O valor da alíquota interestadual das UF deve ser um dos três valores: 4.00, 7.00, 12.00',
  })
  pICMSInter: string;

  @IsNotEmpty({
    message: `
      Percentual de partilha para a UF do destinatário: 
      - 40% em 2016
      - 60% em 2017
      - 80% em 2018
      - 100% em 2019
    `,
  })
  @Type(() => TDec_0302a04)
  pICMSInterPart: TDec_0302a04;

  @IsOptional()
  @Type(() => TDec_1302)
  vFCPUFDest: TDec_1302;

  @IsNotEmpty({
    message: 'Valor do ICMS de partilha para a UF do destinatário.',
  })
  @Type(() => TDec_1302)
  vICMSUFDest: TDec_1302;

  @IsNotEmpty({
    message:
      'Valor do ICMS de partilha para a UF do remetente. Nota: A partir  de 2019, este valor será zero',
  })
  @Type(() => TDec_1302)
  vICMSUFRemt: TDec_1302;
}
