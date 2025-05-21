import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { infNFeDto } from 'src/nfe/dto/create_NFe/infNfe/create-nfe.dto';

export class TNFeDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => infNFeDto)
  infNFe: infNFeDto;
}
