import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { PISAliqDto } from './pisAli.dto';
import { pisQtdeDto } from './pisQtde.dto';
import { pisNTDto } from './pisNT.dto';
import { pisOutrDto } from './pisOutr.dto';

export class pisDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => PISAliqDto)
  PISAliq: PISAliqDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => pisQtdeDto)
  PISQtde: pisQtdeDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => pisNTDto)
  PISNT: pisNTDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => pisOutrDto)
  PISOutr: pisOutrDto;
}
