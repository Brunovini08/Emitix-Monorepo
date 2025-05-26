import { IsEnum, IsString } from 'class-validator';

export enum TUfEnum {
  AC = 'AC',
  AL = 'AL',
  AP = 'AP',
  AM = 'AM',
  BA = 'BA',
  CE = 'CE',
  DF = 'DF',
  ES = 'ES',
  GO = 'GO',
  MA = 'MA',
  MT = 'MT',
  MS = 'MS',
  MG = 'MG',
  PA = 'PA',
  PB = 'PB',
  PR = 'PR',
  PE = 'PE',
  PI = 'PI',
  RJ = 'RJ',
  RN = 'RN',
  RS = 'RS',
  RO = 'RO',
  RR = 'RR',
  SC = 'SC',
  SP = 'SP',
  SE = 'SE',
  TO = 'TO',
}

export class TUf {
  @IsString()
  @IsEnum(TUfEnum, {
    message: `O estado deve ser um dos seguintes valores: ${Object.values(TUfEnum).join(', ')}.`,
  })
  // Código da UF (Unidade Federativa) do emitente da NF-e.
  // O valor deve ser uma sigla de 2 letras, conforme a tabela do IBGE.
  // Exemplo: "SP" para São Paulo, "RJ" para Rio de Janeiro, etc.
  uf!: TUfEnum;
}
