import { IsIn, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { baseCalcDto } from './baseCalc.dto';
import { quantDto } from './quant.dto';
import { validOne } from 'src/resources/middlewares/valid-one/valid-one.decorator';
import { TDec_1302 } from 'src/core/nfe/reusable/types/primitivies_types/TDec_1302';

@validOne(['baseCalc', 'quant'])
export class pisStDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => baseCalcDto)
  baseCalc: baseCalcDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => quantDto)
  quant: quantDto;

  @IsNotEmpty({
    message: 'Valor do PIS ST',
  })
  @Type(() => TDec_1302)
  vPIS: TDec_1302;

  @IsOptional()
  @IsString()
  @IsIn(['0', '1'])
  indSomaPISST: string;
}
