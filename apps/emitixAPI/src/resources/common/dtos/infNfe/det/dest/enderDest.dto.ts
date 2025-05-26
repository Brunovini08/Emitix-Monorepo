import { enderDto } from 'src/core/nfe/reusable/types/complex_types/TEnderEmi/ender.dto';
import type { TString } from 'src/core/nfe/reusable/types/primitivies_types/TString';

export class enderDestDto implements enderDto {
  nro: string;
  xCpl: TString;
  xBairro: string;
  cMun: string;
  xMun: string;
  UF: string;
  CEP: string;
  cPais: string;
  xPais: string;
  fone: string;
  xLgr: TString;
}
