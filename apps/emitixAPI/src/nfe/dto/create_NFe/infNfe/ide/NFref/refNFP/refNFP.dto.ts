import { TCnpj } from 'src/nfe/reusable/types/primitivies_types/TCnpj';
import { TCodUfIBGE } from 'src/nfe/reusable/types/primitivies_types/TCodUfIBGE';
import { TNF } from 'src/nfe/reusable/types/primitivies_types/TNF';
import { TSerie } from 'src/nfe/reusable/types/primitivies_types/TSerie';
import type { refNFDto } from '../refNF/refNF.dto';
import { IsIn, IsNotEmpty, Matches } from 'class-validator';
import { Type } from 'class-transformer';
import { TCpf } from 'src/nfe/reusable/types/primitivies_types/TCpf';
import { TIeDest } from 'src/nfe/reusable/types/primitivies_types/TIeDest';

export class refNFPDto implements refNFDto {
  @IsNotEmpty({
    message:
      'Código da UF do emitente do Documento Fiscal. Utilizar a Tabela do IBGE.',
  })
  @Type(() => TCodUfIBGE)
  cUF: TCodUfIBGE;

  @IsNotEmpty({
    message: 'AAMM da emissão da NF de produtor',
  })
  @Matches(/^[0-9]{2}[0]{1}[1-9]{1}|[0-9]{2}[1]{1}[0-2]{1}$/, {
    message: 'AAMM deve ser um ano e mês válidos (ex: 202301).',
  })
  AAMM: string;

  @IsNotEmpty({
    message: 'CNPJ do emitente da NF de produtor.',
  })
  @Type(() => TCnpj)
  CNPJ: TCnpj;

  @IsNotEmpty({
    message: 'CPF do emitente da NF de produtor',
  })
  @Type(() => TCpf)
  CPF: TCpf;

  @IsNotEmpty({
    message: 'IE do emitente da NF de Produtor',
  })
  @Type(() => TIeDest)
  IE: TIeDest;

  @IsNotEmpty({
    message: 'Série do Documento Fiscal, informar zero se inexistente.',
  })
  @IsNotEmpty({
    message:
      'Código do modelo do Ducmento Fiscal - utilizar 04 para NF de produtor ou 01 para NF Avulsa',
  })
  @IsIn(['04', '01'], {
    message:
      'Código inválido, Código do modelo do Documento Fiscal deve ser 04 para NF de produtor ou 01 para NF Avulsa.',
  })
  mod: string;

  @Type(() => TSerie)
  serie: TSerie;

  @IsNotEmpty({
    message: 'Número do Documento Fiscal',
  })
  @Type(() => TNF)
  nNF: TNF;
}
