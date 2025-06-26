import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { transportaDto } from './transporta/transporta.dto';
import { retTranspDto } from './retTransp/retTransp.dto';
import { veiculoComReboqueDto } from './veiculoComReboque.dto';
import { volDto } from './vol/vol.dto';
import { TString } from 'src/core/nfe/domain/types/primitivies_types/TString';
import { TVeiculo } from 'src/core/nfe/domain/types/primitivies_types/TVeiculo';

export class transpDto {
  @IsNotEmpty({
    message: `
      Modalidade do frete: 
      0 - Contratação do Frete por conta do Remetente (CIF);
      1 - Contratação do Frete por conta do destinatário/remetente (FOB);
      2 - Contratação do Frete por conta de terceiros;
      3 - Transporte próprio por conta do remetente;
      4 - Transporte próprio por conta do destinatário;
      9 - Sem Ocorrência de transporte. 
    `,
  })
  @IsString()
  @IsIn(['0', '1', '2', '3', '4', '9'])
  modFrete: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => transportaDto)
  transporta: transportaDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => retTranspDto)
  retTrasp: retTranspDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => TVeiculo)
  veicTransp: TVeiculo;

  @IsOptional()
  @ValidateNested()
  @Type(() => veiculoComReboqueDto)
  @IsArray()  
  @ArrayMinSize(0)
  @ArrayMaxSize(5)
  reboque: veiculoComReboqueDto[];

  @IsOptional()
  @Type(() => TString)
  @MinLength(1)
  @MaxLength(20)
  vagao: TString;

  @IsOptional()
  @Type(() => TString)
  @MinLength(1)
  @MaxLength(20)
  balsa: TString;

  @IsOptional()
  @ValidateNested()
  @IsArray()
  @Type(() => volDto)
  @ArrayMinSize(0)
  @ArrayMaxSize(5000)
  vol: volDto[];
}
