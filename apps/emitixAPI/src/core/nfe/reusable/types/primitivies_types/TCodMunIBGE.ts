import { IsString, Matches } from 'class-validator';

export class TCodMunIBGE {
  @IsString()
  @Matches(/^[0-9]{7}$/, {
    message: 'O código do município deve ter exatamente 7 dígitos numéricos.',
  })
  codMunIBGE: string;
}
