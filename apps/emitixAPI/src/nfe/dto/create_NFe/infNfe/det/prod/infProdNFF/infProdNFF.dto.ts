import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { TString } from 'src/nfe/reusable/types/primitivies_types/TString';

export class infProdNFFDto {
  @IsNotEmpty({
    message: 'Código Fiscal do Produto é obrigatório',
  })
  @Length(14)
  @Type(() => TString)
  cProdFisco: TString; //Código Fiscal do Produto

  @IsNotEmpty({
    message:
      'Código da operação selecionada na NFF e relacionada ao item, essa propriedade é obrigatória',
  })
  @IsString()
  @Matches(/^[0-9]{1,5}$/)
  cOperNFF: string; //Código da operação selecionada na NFF e relacionada ao item
}
