import { Type } from 'class-transformer';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { TCnpj } from 'src/core/nfe/domain/types/primitivies_types/TCnpj';
import { TString } from 'src/core/nfe/domain/types/primitivies_types/TString';

export class infIntermedDto {
  @IsNotEmpty({
    message:
      'CNPJ do Intermediador da Transação (agenciador, plataforma de delivery, marketplace e similar) de serviços e de negócios.',
  })
  @Type(() => TCnpj)
  CNPJ: TCnpj;

  @IsNotEmpty({
    message: 'Identificador cadastrado no intermediador',
  })
  @Type(() => TString)
  @MinLength(2)
  @MaxLength(60)
  idCadIntTran: TString;
}
