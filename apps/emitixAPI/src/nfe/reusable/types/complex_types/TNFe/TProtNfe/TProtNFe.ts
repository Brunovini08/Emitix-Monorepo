import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { infProt } from './infProt';
import { TSignature } from '../../../primitivies_types/TSignature';
import { TVerNFe } from '../TVerNFe';

export class TProtNFe {
  @IsNotEmpty({
    message: 'Dados do protocolo de status',
  })
  @ValidateNested()
  @Type(() => infProt)
  infProt: infProt;

  @IsOptional()
  @ValidateNested()
  @Type(() => TSignature)
  signature: TSignature;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => TVerNFe)
  versao: TVerNFe;
}
