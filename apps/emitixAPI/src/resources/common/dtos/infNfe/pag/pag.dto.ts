import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { detPagDto } from './detPag.dto';
import { TDec_1302 } from 'src/core/nfe/reusable/types/primitivies_types/TDec_1302';

export class pagDto {
  @IsNotEmpty({
    message: 'Grupo de detalhamento da forma ade pagamento',
  })
  @ValidateNested()
  @IsArray()
  @ArrayMaxSize(100)
  @Type(() => detPagDto)
  detPag: detPagDto[];

  @IsOptional()
  @Type(() => TDec_1302)
  vTroco: TDec_1302; // Valor do troco
}
