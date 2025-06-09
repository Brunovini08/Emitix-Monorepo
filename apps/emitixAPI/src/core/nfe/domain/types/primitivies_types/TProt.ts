import { IsString, Matches } from 'class-validator';

export class TProt {
  @IsString()
  @Matches(/^[0-9]{15}$/, {
    message:
      'O protocolo de autorização da NF-e deve ter exatamente 15 dígitos numéricos.',
  })
  protNFe!: string;
  // Protocolo de Autorização da NF-e, com 15 dígitos, sendo os 3 primeiros dígitos o código do estado, os 2 dígitos seguintes o ano de emissão, os 2 dígitos seguintes o mês de emissão, os 4 dígitos seguintes o CNPJ do emitente, os 4 dígitos seguintes o modelo do documento, os 9 dígitos seguintes o número do documento e os 1 dígito seguinte o dígito verificador.
}
