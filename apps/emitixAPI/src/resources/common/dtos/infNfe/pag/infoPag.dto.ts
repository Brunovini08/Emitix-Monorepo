import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { TCnpj } from 'src/core/nfe/reusable/types/primitivies_types/TCnpj';
import { TUfEmi } from 'src/core/nfe/reusable/types/primitivies_types/TUfEmi';

export class infoPagDto {
  @IsNotEmpty({
    message: `
        CNPJ transacional do pagamento - PReencher informando o CNPJ do estabelecimento onde o pagamento foi
        processado/transacionado/recebido quando a emissão do documento fiscal ocorrer em estabelecimento distinto
      `,
  })
  @Type(() => TCnpj)
  CNPJPag: TCnpj;

  @IsNotEmpty({
    message:
      'UF do CNPJ do estabelecimento onde o pagamento foi processado/transacionado/recebido.',
  })
  @Type(() => TUfEmi)
  UFPag: TUfEmi;
}
