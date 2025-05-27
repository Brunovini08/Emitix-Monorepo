import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { TDec_1203 } from 'src/core/nfe/reusable/types/primitivies_types/TDec_1203';

export class encerranteDto {
  @IsNotEmpty({
    message: 'Número de identificação do Bico utilizado no abastecimento',
  })
  @IsString()
  @Matches(/^[0-9]{1,3}$/)
  nBico: string; // Numero de identificação do Bico utilizado no abastecimento

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{1,3}$/)
  nBomba: string; // Numero de identificação da bomba ao qual o bico está interligado

  @IsNotEmpty({
    message:
      'Número de identificação do tanque ao qual o bico está interligado',
  })
  @Matches(/^[0-9]{1,3}$/)
  @IsString()
  nTanque: string; // Numero de identificação do tanque ao qual o bico está interligado

  @IsNotEmpty({
    message: 'Valor do Encerrante no ínicio do abastecimento',
  })
  @Type(() => TDec_1203)
  vEncIni: TDec_1203; // Valor do Encerrante no ínicio do abastecimento

  @IsNotEmpty({
    message: 'Valor do Encerrante no final do abastecimento',
  })
  @Type(() => TDec_1203)
  vEncFin: TDec_1203; // Valor do Encerrante no final do abastecimento
}
