import { Type } from 'class-transformer';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TData } from 'src/core/nfe/domain/types/primitivies_types/TData';
import { TDec_1302Opc } from 'src/core/nfe/domain/types/primitivies_types/TDec_1302Opc';

export class ISSQNtotDto {
  @IsOptional()
  @Type(() => TDec_1302Opc)
  vServ: TDec_1302Opc;

  @IsOptional()
  @Type(() => TDec_1302Opc)
  vBC: TDec_1302Opc;

  @IsOptional()
  @Type(() => TDec_1302Opc)
  vISS: TDec_1302Opc;

  @IsOptional()
  @Type(() => TDec_1302Opc)
  vPIS: TDec_1302Opc;

  @IsOptional()
  @Type(() => TDec_1302Opc)
  vCOFINS: TDec_1302Opc;

  @IsNotEmpty({
    message: 'Data da prestação do serviço (AAAA-MM-DD)',
  })
  @Type(() => TData)
  dCompet: TData;

  @IsOptional()
  @Type(() => TDec_1302Opc)
  vDeducao: TDec_1302Opc;

  @IsOptional()
  @Type(() => TDec_1302Opc)
  vOutro: TDec_1302Opc;

  @IsOptional()
  @Type(() => TDec_1302Opc)
  vDescIncond: TDec_1302Opc;

  @IsOptional()
  @Type(() => TDec_1302Opc)
  vDescCond: TDec_1302Opc;

  @IsOptional()
  @Type(() => TDec_1302Opc)
  vISSRet: TDec_1302Opc;

  @IsOptional()
  @IsString()
  @IsIn(['1', '2', '3', '4', '5', '6'])
  retTrib: string;
}
