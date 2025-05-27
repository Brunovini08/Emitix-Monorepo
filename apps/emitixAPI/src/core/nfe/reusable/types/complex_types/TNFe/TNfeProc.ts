import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { TNFeDto } from './TNFe';
import { TProtNFe } from './TProtNfe/TProtNFe';
import { TVerNFe } from './TVerNFe';

export class TNfeProc {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => TNFeDto)
  NFe: TNFeDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => TProtNFe)
  protNFe: TProtNFe;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => TVerNFe)
  versao: TVerNFe;
}
