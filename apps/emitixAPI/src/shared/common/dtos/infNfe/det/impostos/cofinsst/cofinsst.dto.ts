import { Type } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { baseCalcDto } from './baseCalc.dto';
import { quantDto } from '../pisst/quant.dto';
import { validOne } from 'src/shared/middlewares/valid-one/valid-one.decorator';
import { TDec_1302 } from 'src/core/nfe/domain/types/primitivies_types/TDec_1302';

@validOne(['baseCalc', 'quant'])
export class cofinsSTDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => baseCalcDto)
  baseCalc: baseCalcDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => quantDto)
  quant: quantDto;

  @IsNotEmpty({
    message: 'Valor do COFINS ST',
  })
  @Type(() => TDec_1302)
  vCOFINS: TDec_1302;

  @IsOptional()
  @IsString()
  @IsIn(['0', '1'])
  indSomaCOFINSST: string;
}
