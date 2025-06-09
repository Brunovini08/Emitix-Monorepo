import { IsEnum, IsString } from 'class-validator';

enum TCOrgaoIBGEEnum {
  AC = '12',
  AL = '27',
  AM = '13',
  AP = '16',
  BA = '29',
  CE = '23',
  DF = '53',
  ES = '32',
  GO = '52',
  MA = '21',
  MG = '31',
  MS = '50',
  MT = '51',
  PA = '15',
  PB = '25',
  PE = '26',
  PI = '22',
  PR = '41',
  RJ = '33',
  RN = '24',
  RO = '11',
  RR = '14',
  RS = '43',
  SC = '42',
  SE = '28',
  SP = '35',
  TO = '17',
}

export class TCOrgaoIBGE {
  @IsString()
  @IsEnum(TCOrgaoIBGEEnum, {
    message:
      'O órgão IBGE deve ser um dos seguintes valores: ' +
      Object.values(TCOrgaoIBGEEnum).join(', '),
  })
  // Código do órgão IBGE do estado
  // Código do órgão IBGE, com 2 dígitos, sendo os 2 primeiros dígitos o código do estado.
  // Exemplo: 12 para Acre, 27 para Alagoas, 13 para Amazonas, etc.
  orgaoIBGE!: TCOrgaoIBGEEnum;
}
