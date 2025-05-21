import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, Matches, ValidateNested } from 'class-validator';
import { IsUniqueDay } from 'src/is-unique-day/is-unique-day.decorator';
import { TDec_1110v } from 'src/nfe/reusable/types/primitivies_types/TDec_1110v';

export class forDiaDto {
  @IsNotEmpty({
    message: 'Quantidade em quilogramas = peso líquido',
  })
  @ValidateNested()
  @Type(() => TDec_1110v)
  qtde: TDec_1110v;

  @IsNotEmpty({
    message: 'Número do dia',
  })
  @IsString()
  @IsUniqueDay()
  @Matches(/^[1-9]|[1][0-9]|[2][0-9]|[3][0-1]$/)
  dia: string;
}
