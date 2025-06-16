import { Type } from 'class-transformer';
import { IsIn, IsNotEmpty, Matches } from 'class-validator';
import  { TCnpj } from 'src/core/nfe/domain/types/primitivies_types/TCnpj';
import  { TCodUfIBGE } from 'src/core/nfe/domain/types/primitivies_types/TCodUfIBGE';
import  { TNF } from 'src/core/nfe/domain/types/primitivies_types/TNF';
import  { TSerie } from 'src/core/nfe/domain/types/primitivies_types/TSerie';

export class refNFDto {
  @IsNotEmpty({
    message:
      'Código da UF do emitente do Documento Fiscal. Utilizar a Tabela do IBGE.',
  })
  @Type(() => TCodUfIBGE)
  cUF: TCodUfIBGE;

  @IsNotEmpty({
    message: 'AAMM da emissão',
  })
  @Matches(/^[0-9]{2}[0]{1}[1-9]{1}|[0-9]{2}[1]{1}[0-2]{1}$/, {
    message: 'AAMM deve ser um ano e mês válidos (ex: 202301).',
  })
  AAMM: string;

  @IsNotEmpty({
    message: 'CNPJ do emitente do documento fiscal referenciado.',
  })
  @Type(() => TCnpj)
  CNPJ: TCnpj;

  @IsNotEmpty({
    message:
      'Código do modelo do Dumento Fiscal. Utilizar 01 para NF modelo 1/1A e 02 para NF modelo 02',
  })
  @IsIn(['01', '02'], {
    message:
      'Código inválido, Código do modelo do Documento Fiscal deve ser 01 para NF modelo 1/1A e 02 para NF modelo 02.',
  })
  mod: string;

  @IsNotEmpty({
    message: 'Série do Ducmento FIscal, informar zero se inexistente',
  })
  @Type(() => TSerie)
  serie: TSerie;

  @IsNotEmpty({
    message: 'Número do Documento Fiscal',
  })
  @Type(() => TNF)
  nNF: TNF;
}
