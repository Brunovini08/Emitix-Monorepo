import { IsString, Matches } from 'class-validator';

export class TCnpjOpc {
  @IsString()
  @Matches(/^[0-9]{0}|[0-9]{14}$/, {
    message:
      'O CNPJ deve ter 14 dígitos numéricos ou estar vazio pois é opcional.',
  })
  // CNPJ do emitente, com 14 dígitos numéricos ou vazio.
  cnpjOpc!: string;
}
