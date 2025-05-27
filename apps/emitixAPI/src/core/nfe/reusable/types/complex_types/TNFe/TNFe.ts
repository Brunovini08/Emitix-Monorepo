import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { infNFeDto } from 'src/core/nfe/dto/create-nfe.dto';

export class TNFeDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => infNFeDto)
  infNFe: infNFeDto;
}
