import { IsString, Matches } from 'class-validator';

export class TCnpj {
  @IsString()
  @Matches(/^[0-9]{14}$/, {
    message: 'O CNPJ deve ter exatamente 14 dígitos numéricos.',
  })
  // CNPJ do emitente, com 14 dígitos numéricos.
  cnpj!: string;
}
