import { IsEnum, IsString } from 'class-validator';
import { TUfEnum } from './TUf';

export class TUfEmi {
  @IsString()
  @IsEnum(TUfEnum, {
    message: `A UF do emitente deve ser um dos seguintes valores: ${Object.values(TUfEnum).join(', ')}.`,
  })
  // Código da UF (Unidade Federativa) do emitente da NF-e.
  // O valor deve ser uma sigla de 2 letras, conforme a tabela do IBGE.
  // Exemplo: "SP" para São Paulo, "RJ" para Rio de Janeiro, etc.
  uf!: TUfEnum;
}
