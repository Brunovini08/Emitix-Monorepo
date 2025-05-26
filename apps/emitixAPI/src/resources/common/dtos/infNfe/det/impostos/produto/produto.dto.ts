import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested, IsOptional } from 'class-validator';
import { TIpi } from 'src/core/nfe/reusable/types/complex_types/TIpi/TIpi';
import { ICMSDto } from '../icms/ICMS.dto';
import { IIDto } from '../II/II.dto';

export class produtoDto {
  @IsNotEmpty({
    message: `
      Você deve informar os dados do ICMS Normal e ST
    `,
  })
  @ValidateNested()
  @Type(() => ICMSDto)
  ICMS: ICMSDto; // Dados do ICMS Normal e ST

  @IsOptional()
  @ValidateNested()
  @Type(() => TIpi)
  IPI: TIpi;

  @IsOptional()
  @ValidateNested()
  @Type(() => IIDto)
  II: IIDto;
}
