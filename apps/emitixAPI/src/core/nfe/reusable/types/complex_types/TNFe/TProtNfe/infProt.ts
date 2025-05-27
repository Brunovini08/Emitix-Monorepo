import { Type } from 'class-transformer';
import {
  IsBase64,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { TAmb } from '../../../primitivies_types/TAmb';
import { TVerAplic } from '../../../primitivies_types/TVerAplic';
import { TStat } from '../../../primitivies_types/TStat';
import { TMotivo } from '../../../primitivies_types/TMotivo';
import { TCodUfIBGE } from '../../../primitivies_types/TCodUfIBGE';
import { TDateTimeUTC } from '../../../primitivies_types/TDateTimeUTC';
import { TChNFe } from '../../../primitivies_types/TChNFe';
import { TProt } from '../../../primitivies_types/TProt';
import { TString } from '../../../primitivies_types/TString';

export class infProt {
  @IsNotEmpty({
    message: 'Identificação do Ambiente: 1 - Produção; 2 - Homologação',
  })
  @ValidateNested()
  @Type(() => TAmb)
  tpAmb: TAmb;

  @IsNotEmpty({
    message: 'Versão do Aplicativo que recebeu o Lote',
  })
  @ValidateNested()
  @Type(() => TVerAplic)
  verAplic: TVerAplic;

  @IsNotEmpty({
    message:
      'Chavede acesso da NF-e, compostas por: UF do emitente, AAMM da emissão da NFe, CNPJ do emitente, modelo, série e número da NF-e e código numérico+DV',
  })
  @ValidateNested()
  @Type(() => TChNFe)
  chNFe: TChNFe;

  @IsNotEmpty({
    message:
      'Data e hora de processamento, no formato AAA-MM-DTHH:MM:SSTZD. Deve ser preenchida comdata e hora de gravação no Banco em caso de COnfirmação. Em caso de Rejeição, com daa e hora do recebimento do Lote de NF-e enviado.',
  })
  @ValidateNested()
  @Type(() => TDateTimeUTC)
  dhRecbto: TDateTimeUTC;

  @IsOptional()
  @ValidateNested()
  @Type(() => TProt)
  nProt: TProt;

  @IsOptional()
  @IsBase64()
  digVal: string;

  @IsNotEmpty({
    message: 'Código do status da mensagem enviada',
  })
  @ValidateNested()
  @Type(() => TStat)
  cStat: TStat;

  @IsNotEmpty({
    message: 'Descrição literal do status do serviço solicitado',
  })
  @ValidateNested()
  @Type(() => TMotivo)
  xMotivo: TMotivo;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{1,4}$/)
  cMsg: string;

  @IsOptional()
  @MinLength(1)
  @MaxLength(200)
  @ValidateNested()
  @Type(() => TString)
  xMsg: TString;

  @IsOptional()
  @IsString()
  Id: string;
}
