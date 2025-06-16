import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import  { cideDto } from './cide/cide.dto';
import  { encerranteDto } from './encerrante/encerrante.dto';
import  { origCombDto } from './origComb/origComb.dto';
import  { TDec_0302a04Max100 } from 'src/core/nfe/domain/types/primitivies_types/TDec_0302a04Max100';
import  { TDec_03v00a04Max100Opc } from 'src/core/nfe/domain/types/primitivies_types/TDec_03v00a04Max100Opc';
import  { TDec_1204temperatura } from 'src/core/nfe/domain/types/primitivies_types/TDec_1204temperatura';
import  { TDec_1302 } from 'src/core/nfe/domain/types/primitivies_types/TDec_1302';
import  { TString } from 'src/core/nfe/domain/types/primitivies_types/TString';
import  { TUf } from 'src/core/nfe/domain/types/primitivies_types/TUf';

export class combDto {
  @IsNotEmpty({
    message:
      'Código de produto da ANP. codificação de produtos do SIMP (http://www.anp.gov.br)',
  })
  @IsString()
  @Matches(/^[0-9]{9}$/)
  cProdANP: string;

  @IsNotEmpty({
    message:
      'Descrição do Produto conforme ANP. Utilizar a descrição de produtos do Sistema de Informações de Movimentação de Produtos - SIMP (http://www.anp.gov/simp)',
  })
  @MinLength(2)
  @MaxLength(95)
  @Type(() => TString)
  descANP: TString;
  // Descrição do Produto conforme ANP. Utilizar a descrição de
  // de produtos do Sistema de Informações de Movimentação de Produtos - SIMP

  @IsOptional()
  @Type(() => TDec_0302a04Max100)
  pGLP: TDec_0302a04Max100; // Percentual do GLP derivado do petróleo no produto GLP (cProdANP=210203001). Informar em número decimal o percentual do GLP derivado de petróleo no produto GLP. Valores 0 a 100.

  @IsOptional()
  @Type(() => TDec_0302a04Max100)
  pGNn: TDec_0302a04Max100; // Percentual de gás natural nacional - GLGNn para o produto GLP (cProdANP=210203001). Informar em número decimal o percentual do Gás Natural Nacional - GLGNn para o produto GLP. Valores de 0 a 100.

  @IsOptional()
  @Type(() => TDec_0302a04Max100)
  pGNi: TDec_0302a04Max100; // Percentual de gás natural importado GLGNi para o produto GLP (cProdANP=210203001). Informar em número deciaml o percentual do Gás Natural Importado - GLGNi para o produto GLP. Valores de 0 a 100.

  @IsOptional()
  @Type(() => TDec_1302)
  vPart: TDec_1302; //Valor de partida (cProdANP=210203001). Deve ser informado neste campo o valor por quilograma sem ICMS.

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{1,21}$/)
  CODIF: string; // Código de autorização / registro do CODIF. Informar apenas quando a UF utilizar o CODIF (Sistema de Controle do 			Diferimento do Imposto nas Operações com AEAC - Álcool Etílico Anidro Combustível).

  @IsOptional()
  @Type(() => TDec_1204temperatura)
  qTemp: TDec_1204temperatura;
  /*
  Quantidade de combustível
  faturada à temperatura ambiente.
  Informar quando a quantidade
  faturada informada no campo
  qCom (I10) tiver sido ajustada para
  uma temperatura diferente da
  ambiente.
 */

  @IsOptional()
  @Type(() => TUf)
  UFCons: TUf; // Sigla da UF de Consumo

  @IsOptional()
  CIDE: cideDto; // CIDE Combustíveis

  @IsOptional()
  encerrante: encerranteDto; // Informações do grupo de &quot;encerrante&quot;

  @IsOptional()
  @Type(() => TDec_03v00a04Max100Opc)
  pBio: TDec_03v00a04Max100Opc; // Percentual do índice de mistura do Biodiesel (B100) no Óleo Diesel B instituído pelo órgão regulamentador

  @IsOptional()
  @MinLength(0)
  @MaxLength(30)
  origComb: origCombDto[]; // Grupo indicador da origem do combustível

  @IsNotEmpty({
    message: 'Número do RECOPI',
  })
  @IsString()
  @Length(20)
  @Matches(/^[0-9]{20}$/)
  nRECOPI: string;
}
