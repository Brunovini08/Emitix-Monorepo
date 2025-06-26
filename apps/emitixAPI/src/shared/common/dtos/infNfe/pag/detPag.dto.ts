import { Type } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { cardDto } from './card.dto';
import { TDec_1302 } from 'src/core/nfe/domain/types/primitivies_types/TDec_1302';
import { TString } from 'src/core/nfe/domain/types/primitivies_types/TString';

export class detPagDto {
  @IsOptional()
  @IsString()
  @IsIn(['0', '1'])
  indPag: string; // Indicador dea Forma de Pagamento: 0 - Pagamento à Vista; 1 - Pagamento à Prazo;

  @IsNotEmpty({
    message: 'Forma de Pagamento',
  })
  @IsString()
  @Matches(/^[0-9]{2}$/)
  tPag: string;

  @IsOptional()
  @Type(() => TString)
  @MinLength(2)
  @MaxLength(60)
  xPag: TString;

  @IsNotEmpty({
    message:
      'Valor do Pagamento. Esta tag poderá ser omitida quando a tag tPag= 90  (Sem Pagamento), caso contrário deverá ser preenchida',
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  @ValidateIf((o) => o.tPag != '90')
  @Type(() => TDec_1302)
  vPag: TDec_1302;

  @IsOptional()
  @ValidateNested()
  @Type(() => cardDto)
  card: cardDto;
}
