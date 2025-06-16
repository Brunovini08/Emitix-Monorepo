import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { TCnpjOpc } from '../../primitivies_types/TCnpjOpc';
import { TString } from '../../primitivies_types/TString';
import { CSRTDTo } from './CSRT.dto';

export class TInfRespTec {
  @IsNotEmpty({
    message: 'CNPJ é obrigatório',
  })
  @ValidateNested()
  @Type(() => TCnpjOpc)
  CNPJ: TCnpjOpc;

  @IsNotEmpty({
    message:
      'Informar o nome da pessoa a ser contatada na empresa desenvolvedora do sistema utilizado na emissão do documento fiscal eletrônico.',
  })
  @ValidateNested()
  @Type(() => TString)
  @MinLength(2)
  @MaxLength(60)
  xContato: TString;

  @IsNotEmpty({
    message:
      'Informar o e-mail da pessoa a ser contatada na empresa desenvolvedora do sistema.',
  })
  @ValidateNested()
  @Type(() => TString)
  @MinLength(6)
  @MaxLength(60)
  email: TString;

  @IsNotEmpty({
    message:
      'Informar o telefone da pessoa a ser contatada na empresa desenvolvedora do sistema. Preencher o Código DDD + número do telefone',
  })
  @IsString()
  @Matches(/^[0-9]{6, 14}$/)
  fone: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CSRTDTo)
  CSRT: CSRTDTo;
}
