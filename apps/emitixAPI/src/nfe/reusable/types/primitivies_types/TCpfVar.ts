import { IsString, Matches } from 'class-validator';

export class TCpfVar {
  @IsString()
  @Matches(/^[0-9]{3, 11}$/, {
    message: 'O CPF deve ter exatamente 11 dígitos numéricos.',
  })
  // CPF do emitente, com 11 dígitos numéricos.
  cpfVar!: string;
}
