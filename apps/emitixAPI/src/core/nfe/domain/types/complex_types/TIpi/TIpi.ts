import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { TCnpj } from '../../primitivies_types/TCnpj';
import { TString } from '../../primitivies_types/TString';
import { IPITrib } from './IPITrib';
import { IPINT } from './IPINT';

export class TIpi {
  @IsOptional()
  @ValidateNested()
  @Type(() => TCnpj)
  CNPJProd: TCnpj;

  @IsOptional()
  @MinLength(1)
  @MaxLength(60)
  @ValidateNested()
  @Type(() => TString)
  cSelo: TString;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{1, 12}$/)
  qSelo: string;

  @IsOptional()
  @MinLength(1)
  @MaxLength(3)
  @ValidateNested()
  @Type(() => TString)
  cEnq: TString;

  @IsOptional()
  @ValidateNested()
  @Type(() => IPITrib)
  IPITrib: IPITrib;

  @IsOptional()
  @ValidateNested()
  @Type(() => IPINT)
  IPINT: IPINT;
}
