import { IsString, Matches } from 'class-validator';

export class TChNFe {
  // Chave de Acesso da NFe
  // Chave de Acesso da NF-e, com 44 dígitos, sendo os 3 primeiros dígitos o código do estado, os 2 dígitos seguintes o ano de emissão, os 2 dígitos seguintes o mês de emissão, os 4 dígitos seguintes o CNPJ do emitente, os 4 dígitos seguintes o modelo do documento, os 9 dígitos seguintes o número do documento e os 1 dígito seguinte o dígito verificador.
  @IsString()
  @Matches(/^[0-9]{44}$/, {
    message:
      'A chave de acesso da NF-e deve ter exatamente 44 dígitos numéricos.',
  })
  chNFe!: string;
}
