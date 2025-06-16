import { Type } from 'class-transformer';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { TCodUfIBGE } from 'src/core/nfe/domain/types/primitivies_types/TCodUfIBGE';
import { TDec_03v00a04Max100Opc } from 'src/core/nfe/domain/types/primitivies_types/TDec_03v00a04Max100Opc';

export class origCombDto {
  @IsNotEmpty({
    message: 'Indicador de importação 0=Nacional; 1=Importado',
  })
  @IsString()
  @IsIn(['1', '2'])
  indImport: string; //Indicador de importação 0=Nacional; 1=Importado;

  @IsNotEmpty({
    message: 'UF de origem do produtor ou do importado',
  })
  @Type(() => TCodUfIBGE)
  cUFOrig: TCodUfIBGE; // UF de origem do produtor ou do importado

  @IsNotEmpty({
    message: 'Percentual originário para a UF',
  })
  @Type(() => TDec_03v00a04Max100Opc)
  pOrig: TDec_03v00a04Max100Opc; // Percentual originário para a UF
}
