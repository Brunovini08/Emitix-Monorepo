import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { produtoDto } from './produto/produto.dto';
import { servicoDto } from './servico/servico.dto';
import { pisDto } from './pis/pis.dto';
import { pisStDto } from './pisst/pisst.dto';
import { cofinsDto } from './cofins/confins.dto';
import { cofinsSTDto } from './cofinsst/cofinsst.dto';
import { icmsUfDestDto } from './icmsUfDest/icmsUfDest.dto';
import { ICMSDto } from './icms/ICMS.dto';
import { TDec_1302 } from 'src/core/nfe/domain/types/primitivies_types/TDec_1302';

export class impostosDto {
  @IsOptional()
  @Type(() => TDec_1302)
  vTotTrib: TDec_1302; // Valor Total dos Tributos

  @IsNotEmpty({
    message: 'Um tipo de ICMS deve ser enviado',
  })
  @ValidateNested()
  @Type(() => ICMSDto)
  ICMS: ICMSDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => produtoDto)
  produto: produtoDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => servicoDto)
  servico: servicoDto;

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
}
