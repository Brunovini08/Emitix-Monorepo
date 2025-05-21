import { IsString, Matches } from 'class-validator';

export class TPlaca {
  @IsString()
  @Matches(/^[A-Z]{2,3}[0-9]{4}|[A-Z]{3,4}[0-9]{3}|[A-Z0-9]{7}$/, {
    message:
      'A placa deve ter entre 7 e 8 caracteres, podendo conter letras e números.',
  })
  // Placa do veículo, com 7 a 8 caracteres alfanuméricos.
  placa!: string;
}
