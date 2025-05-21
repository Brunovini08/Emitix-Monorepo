import { IsString, Matches } from 'class-validator';

export class TIdLote {
  @IsString()
  @Matches(/^[0-9]{1, 15}$/)
  lote: string;
}
