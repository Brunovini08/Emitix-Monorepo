import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import type { enderDestDto } from './enderDest.dto';
import type { IIndicadorIEDest } from '../../../../../../core/nfe/reusable/interfaces/IIndicadorIEDest';
import { Type } from 'class-transformer';
import { TCnpj } from 'src/core/nfe/reusable/types/primitivies_types/TCnpj';
import { TCpf } from 'src/core/nfe/reusable/types/primitivies_types/TCpf';
import { TIdEstrangeiro } from 'src/core/nfe/reusable/types/primitivies_types/TIdEstrangeiro';
import { TString } from 'src/core/nfe/reusable/types/primitivies_types/TString';
import { TIeDestNaoIsento } from 'src/core/nfe/reusable/types/primitivies_types/TIeDestNaoIsento';

export class destDto {
  @IsNotEmpty()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  @ValidateIf((o) => !o.CPF && !o.idEstrangeiro)
  @Type(() => TCnpj)
  CNPJ: TCnpj;

  @IsNotEmpty()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  @ValidateIf((o) => !o.CNPJ && !o.idEstrangeiro)
  @Type(() => TCpf)
  CPF: TCpf;

  @IsNotEmpty()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  @ValidateIf((o) => !o.CNPJ && !o.CPF)
  @Type(() => TIdEstrangeiro)
  idEstrangeiro: TIdEstrangeiro;

  @IsOptional()
  @Type(() => TString)
  xNome: TString; // Razão social do destinatário

  @IsNotEmpty({ message: 'enderDest is required' })
  enderDest: enderDestDto; // Endereço do destinatário

  @IsString()
  @IsNotEmpty({ message: 'IndIEDest is required' })
  @IsIn(['1', '2', '9'], { message: 'IndIEDest must be either 1, 2 or 9' })
  indIEDest: IIndicadorIEDest;

  @IsOptional()
  @Type(() => TIeDestNaoIsento)
  IE: TIeDestNaoIsento; // Inscrição Estadual do destinatário

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{8,9}$/, {
    message:
      'Inscrição na SUFRAMA (Obrigatório nas operações com as áreas com benefícios de incentivos fiscais sob controle da SUFRAMA)',
  })
  ISUF: string; // Inscrição na SUFRAMA (Obrigatório nas operações cp, as áreas com benefícios de incentivos fiscais sob controle da SUFRAMA)

  @IsOptional()
  @MinLength(1)
  @MaxLength(15)
  @Type(() => TString)
  IM: string; // Inscrição Municipal do destinatário (opcional)

  @IsOptional()
  @IsEmail(
    {},
    {
      message:
        'Informar o e-mail do destinatário. O campo pode ser utilizado para informar o e-mail de recepção da NF-e indicada pelo destinatário',
    },
  )
  @MinLength(1, { message: 'Email must be at least 1 character' })
  @MaxLength(60, { message: 'Email must be less than 60 characters' })
  @Type(() => TString)
  email: TString;
}
