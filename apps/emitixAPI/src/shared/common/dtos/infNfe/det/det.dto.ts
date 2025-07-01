import { Type } from 'class-transformer';
import { prodDto } from './prod/prod.dto';
import {
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { impostoDevolDto } from './impostoDevol/impostoDevol.dto';
import { impostosDto } from './impostos/impostos.dto';
import { obsItemDto } from './obsItem/obsItem.dto';

export class detDto {
  @ValidateNested()
  @Type(() => prodDto)
  prod: prodDto;

  @IsNotEmpty({
    message: 'Tributos incidentes nos produtos ou serviços da NF-e',
  })
  @ValidateNested()
  @Type(() => impostosDto)
  imposto: impostosDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => impostoDevolDto)
  impostoDevol: impostoDevolDto;

  @IsOptional()
  @MinLength(1, {
    message: 'Informações Adicionais do Produto deve ter pelo menos 1 caractere',
  })
  @MaxLength(500, {
    message: 'Informações Adicionais do Produto deve ter no máximo 500 caracteres',
  })
  infAdProd: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => obsItemDto)
  obsItem: obsItemDto;
}
