import { Type } from 'class-transformer';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { TCpf } from 'src/core/nfe/reusable/types/primitivies_types/TCpf';
import { TString } from 'src/core/nfe/reusable/types/primitivies_types/TString';

export class defensivoDto {
  @IsNotEmpty({
    message: 'Número do Receituário ou Receita do Defensivo/Agrotóxico',
  })
  @Type(() => TString)
  @MinLength(1)
  @MaxLength(30)
  nReceituario: TString;

  @IsNotEmpty({
    message: 'CPF do Responsável Técnico pelo receituário',
  })
  @Type(() => TCpf)
  CPFRespTec: TCpf;
}
