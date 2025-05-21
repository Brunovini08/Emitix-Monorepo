import {
  ArrayMaxSize,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { defensivoDto } from './defensivo.dto';
import { Type } from 'class-transformer';
import { guiaTransitoDto } from './guiaTransito.dto';
import { validOne } from 'src/valid-one/valid-one.decorator';

@validOne(['defensivo', 'guiaTransito'])
export class agropecuarioDto {
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => defensivoDto)
  @ArrayMaxSize(20)
  defensivo: defensivoDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => guiaTransitoDto)
  guiaTransito: guiaTransitoDto;
}
