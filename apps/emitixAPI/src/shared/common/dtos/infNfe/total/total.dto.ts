import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { ICMSTotDto } from './ICMSTot/ICMSTot.dto';
import { ISSQNtotDto } from './ISSQNtot/ISSQNtot.dto';
import { retTribDto } from './retTrib/retTrib.dto';

export class totalDto {
  @IsNotEmpty({
    message: 'Totais referentes ao ICMS',
  })
  @ValidateNested()
  @Type(() => ICMSTotDto)
  ICMSTot: ICMSTotDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ISSQNtotDto)
  ISSQNtot: ISSQNtotDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => retTribDto)
  retTrib: retTribDto;
}
