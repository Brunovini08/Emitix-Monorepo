import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { TDec_0302Max100 } from 'src/nfe/reusable/types/primitivies_types/TDec_0302Max100';
import { ipiDevolDto } from './ipiDevol.dto';
export class impostoDevolDto {
  @IsNotEmpty({
    message: 'Percentual de mercadoria devolvida',
  })
  @Type(() => TDec_0302Max100)
  pDevol: TDec_0302Max100;

  @IsNotEmpty({
    message: 'Informação de IPI devolvido',
  })
  @ValidateNested()
  @Type(() => ipiDevolDto)
  IPI: ipiDevolDto;
}
