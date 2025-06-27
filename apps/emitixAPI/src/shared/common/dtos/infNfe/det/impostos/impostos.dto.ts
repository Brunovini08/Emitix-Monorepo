import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { pisDto } from './pis/pis.dto';
import { pisStDto } from './pisst/pisst.dto';
import { cofinsDto } from './cofins/confins.dto';
import { cofinsSTDto } from './cofinsst/cofinsst.dto';
import { icmsUfDestDto } from './icmsUfDest/icmsUfDest.dto';
import { ICMSDto } from './icms/ICMS.dto';
import { TDec_1302 } from 'src/core/nfe/domain/types/primitivies_types/TDec_1302';
import { IIDto } from './II/II.dto';
import { ISSQNDto } from './servico/ISSQN.dto';
import { TIpi } from 'src/core/nfe/domain/types/complex_types/TIpi/TIpi';
import { IBSCBSDto } from './IBSCBS/IBSCBS.dto';


export class impostosDto {
  @IsOptional()
  @Type(() => TDec_1302)
  vTotTrib: TDec_1302; // Valor Total dos Tributos

  @IsOptional()
  @ValidateNested()
  @Type(() => ICMSDto)
  ICMS: ICMSDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => TIpi)
  IPI: TIpi;

  @IsOptional()
  @ValidateNested()
  @Type(() => IIDto)
  II: IIDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ISSQNDto)
  ISSQN: ISSQNDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => pisDto)
  PIS: pisDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => pisStDto)
  PISST: pisStDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => cofinsDto)
  COFINS: cofinsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => cofinsSTDto)
  COFINSST: cofinsSTDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => icmsUfDestDto)
  ICMSUFDest: icmsUfDestDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => IBSCBSDto)
  IBSCBS: IBSCBSDto;
}