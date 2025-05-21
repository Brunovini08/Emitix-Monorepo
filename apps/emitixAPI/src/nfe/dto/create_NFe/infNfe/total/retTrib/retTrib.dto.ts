import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { TDec_1302Opc } from 'src/nfe/reusable/types/primitivies_types/TDec_1302Opc';

export class retTribDto {
  @IsOptional()
  @Type(() => TDec_1302Opc)
  vRetPIS: TDec_1302Opc;

  @IsOptional()
  @Type(() => TDec_1302Opc)
  vRetCOFINS: TDec_1302Opc;

  @IsOptional()
  @Type(() => TDec_1302Opc)
  vRetCSLL: TDec_1302Opc;

  @IsOptional()
  @Type(() => TDec_1302Opc)
  vBCIRRF: TDec_1302Opc;

  @IsOptional()
  @Type(() => TDec_1302Opc)
  vIRRF: TDec_1302Opc;

  @IsOptional()
  @Type(() => TDec_1302Opc)
  vBCRetPrev: TDec_1302Opc;

  @IsOptional()
  @Type(() => TDec_1302Opc)
  vRetPRev: TDec_1302Opc;
}
