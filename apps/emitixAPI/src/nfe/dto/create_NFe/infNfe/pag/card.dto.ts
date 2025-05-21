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
import { TCnpj } from 'src/nfe/reusable/types/primitivies_types/TCnpj';
import { TString } from 'src/nfe/reusable/types/primitivies_types/TString';

export class cardDto {
  @IsNotEmpty({
    message: `
      Tipo de Integração do processo de pagamento com o sistema de automação da empresa:
      1 - Pagamento integrado com o sistema de automação da empresa (Ex.: equipamento TEF, Comércio ELetrônico, POS Integrado);
      2 - Pagamento não integrado com o sistema de automação da empresa (Ex.: equipamento POS Simples).
    `,
  })
  @IsString()
  @IsIn(['1', '2'])
  tpIntegra: string;

  @IsOptional()
  @Type(() => TCnpj)
  CNPJ: TCnpj;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{2}$/)
  tBand: string; // Bandeira da operadora de cartão

  @IsOptional()
  @Type(() => TString)
  @MinLength(1)
  @MaxLength(128)
  cAut: TString;

  @IsOptional()
  @Type(() => TCnpj)
  CNPJReceb: TCnpj;

  @IsOptional()
  @Type(() => TString)
  @MinLength(1)
  @MaxLength(40)
  idTErmPag: TString;
}
