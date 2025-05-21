import { Optional } from '@nestjs/common';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { adiDto } from './adi.dto';
import { TCpf } from 'src/nfe/reusable/types/primitivies_types/TCpf';
import { Type } from 'class-transformer';
import { TCnpj } from 'src/nfe/reusable/types/primitivies_types/TCnpj';

export class diDto {
  @IsOptional()
  nDI: string; // Número da DI (Declaração de Importação) - 11 dígitos

  @IsOptional()
  dDI: string; // Data da DI (Declaração de Importação) - Formato: AAAA-MM-DD

  @IsOptional()
  @MinLength(1, { message: 'xLocDesemb must be at least 1 character long' })
  @MaxLength(60, { message: 'xLocDesemb must be less than 60 characters' })
  xLocDesemb: string; // Local de desembaraço aduaneiro - Nome do local onde ocorreu o desembaraço aduaneiro

  @IsOptional()
  @MinLength(1, { message: 'UFDesemb must be at least 1 character long' })
  @MaxLength(2, { message: 'UFDesemb must be exactly 2 characters' })
  UFDesemb: string; // Unidade da Federação do desembaraço aduaneiro - Sigla da UF onde ocorreu o desembaraço aduaneiro (ex: SP, RJ, MG)

  @IsOptional()
  dDesemb: string; // Data do desembaraço aduaneiro - Formato: AAAA-MM-DD

  @IsOptional()
  @IsIn(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'], {
    message: 'tpViaTransp must be a valid value',
  })
  /* 
    Via de transporte internacional informada na DI ou na Declaração Única de Importação (DUIMP)
    1- Marítima, 2- Fluvial, 3- Lacustre, 4- Aérea, 5- Postal, 6- Ferroviaria, 7- Rodiviaria, 8- Conduto, 9- Meios Proprios
    10- Entrada/Saida Ficta, 11- Courier, 12- Em maos, 13- Por reboque
  */
  tpViaTransp: string; // Indicador de desembaraço aduaneiro - Indica a forma de desembaraço aduaneiro da mercadoria

  @Optional()
  vAFRMM: number; // Valor do AFRMM (Adicional ao Frete para Renovação da Marinha Mercante) - Valor do adicional ao frete para renovação da marinha mercante

  @IsIn(['1', '2', '3'], { message: 'tpIntermedio must be a valid value' })
  tpIntermedio: string; // Forma de Importação quanto a intermediação - Indica a forma de importação quanto à intermediação da mercadoria
  /* 
    Forma de Importação quanto a intermediação
    1- Por conta propria, 2- Por conta e ordem, 3- Encomenda
  */

  @IsNotEmpty()
  @ValidateIf((o) => !o.CPF && !o.idEstrangeiro)
  @Type(() => TCnpj)
  CNPJ: TCnpj;

  @IsNotEmpty()
  @ValidateIf((o) => !o.CNPJ && !o.idEstrangeiro)
  @Type(() => TCpf)
  CPF: TCpf;

  @IsNotEmpty({ message: 'ufTerceiro must be provided' })
  @MinLength(2, { message: 'ufTerceiro must be at least 2 characters long' })
  @MaxLength(2, { message: 'ufTerceiro must be exactly 2 characters' })
  ufTerceiro: string; // UF do terceiro - Unidade da Federação do terceiro envolvido na operação de importação

  @IsOptional()
  @MinLength(1, { message: 'cExportador must be at least 1 character long' })
  @MaxLength(60, { message: 'cExportador must be less than 60 characters' })
  cExportador: string; // CNPJ do exportador - CNPJ do exportador da mercadoria (opcional)

  @IsOptional()
  adi: adiDto;
}
