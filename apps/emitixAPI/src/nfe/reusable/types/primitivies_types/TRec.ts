import { IsString, Matches } from 'class-validator';

export class TRec {
  @IsString()
  @Matches(/^[0-9]{15}$/, {
    message: 'O recibo da NF-e deve ter exatamente 15 dígitos numéricos.',
  })
  recNFe!: string;
}
