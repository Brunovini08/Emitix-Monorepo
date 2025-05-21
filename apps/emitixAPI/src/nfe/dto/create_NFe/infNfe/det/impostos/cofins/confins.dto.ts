import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { confinsAliqDto } from './confinsAliq.dto';
import { confinsQtdeDto } from './confinsQtde.dto';
import { cofinsNtDto } from './cofinsnt.dto';
import { cofinsOutrDto } from './cofinsOutr/cofinsOutr.dto';

export class cofinsDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => confinsAliqDto)
  COFINSAliq: confinsAliqDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => confinsQtdeDto)
  COFINSQtde: confinsQtdeDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => cofinsNtDto)
  COFINSNT: cofinsNtDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => cofinsOutrDto)
  COFINSOutr: cofinsOutrDto;
}
