import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { TString } from 'src/core/nfe/domain/types/primitivies_types/TString';

export class infNFeSupl {
  @IsNotEmpty({
    message: 'QRCode deve conter informações',
  })
  @IsString()
  @MinLength(100)
  @MaxLength(600)
  qrCode: string;

  @IsNotEmpty({
    message:
      'Informar a URL da &quot;Consulta por chave de acesso da NFC-e&quot;. A mesma URL que deve estar informada no DANFE NFC-e para consulta por chave de acesso.',
  })
  @Type(() => TString)
  @MinLength(21)
  @MaxLength(85)
  urlChave: TString;
}
