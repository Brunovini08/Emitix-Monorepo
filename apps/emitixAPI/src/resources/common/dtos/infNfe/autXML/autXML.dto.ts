import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateIf } from 'class-validator';
import { TCnpj } from 'src/core/nfe/reusable/types/primitivies_types/TCnpj';
import { TCpf } from 'src/core/nfe/reusable/types/primitivies_types/TCpf';

export class autXMLDto {
  @IsNotEmpty()
  @ValidateIf((o) => !o.CPF)
  @Type(() => TCnpj)
  CNPJ: TCnpj;

  @IsNotEmpty()
  @ValidateIf((o) => !o.CNPJ)
  @Type(() => TCpf)
  CPF: TCpf;
}
