import { IsString, Matches } from 'class-validator';

export class TCnpjVar {
  @IsString()
  @Matches(/^[0-9]{3, 14}$/, {
    message: 'O CNPJ deve ter entre 3 e 14 dígitos numéricos.',
  })
  // CNPJ do emitente, com 3 a 14 dígitos numéricos.
  cnpjVar!: string;
}
