import { Type } from 'class-transformer';
import { prodDto } from './prod/prod.dto';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { TString } from 'src/nfe/reusable/types/primitivies_types/TString';
import { impostoDevolDto } from './impostoDevol/impostoDevol.dto';
import { impostosDto } from './impostos/impostos.dto';
import { obsItemDto } from './obsItem/obsItem.dto';

export class detDto {
  @ValidateNested()
  @Type(() => prodDto)
  prod: prodDto;

  @IsNotEmpty({
    message: 'Trivutos incidentes nos produtos ou serviços da NF-e',
  })
  @ValidateNested()
  @Type(() => impostosDto)
  imposto: impostosDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => impostoDevolDto)
  impostoDevol: impostoDevolDto;

  @IsOptional()
  @ValidateNested()
  @MinLength(1)
  @MaxLength(500)
  @Type(() => TString)
  infAdProd: TString;

  @IsOptional()
  @ValidateNested()
  @Type(() => obsItemDto)
  obsItem: obsItemDto;
}
