import { IsString, Matches } from 'class-validator';

export class TStat {
  @IsString()
  @Matches(/^[0-9]{3}$/, {
    message:
      'O código do status da NF-e deve ter exatamente 3 dígitos numéricos.',
  })
  // Código do Status da NF-e
  // Código do Status da NF-e, com 3 dígitos, sendo os 3 primeiros dígitos o código do estado.
  stat!: string;
}
