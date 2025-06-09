import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';
import  { TString } from 'src/core/nfe/domain/types/primitivies_types/TString';
import  { TUfEmi } from 'src/core/nfe/domain/types/primitivies_types/TUfEmi';

export class exportaDto {
  @IsNotEmpty({
    message: 'Sigla da UF de Emarque ou de transposição de fronteira',
  })
  @Type(() => TUfEmi)
  UFSaidaPais: TUfEmi;

  @IsNotEmpty({
    message: 'Local de Embarque ou de transposição de fronteira',
  })
  @Type(() => TString)
  @MinLength(1)
  @MaxLength(60)
  xLocExporta: TString;

  @IsOptional()
  @Type(() => TString)
  @MinLength(1)
  @MaxLength(60)
  xLocDespacho: TString;
}
