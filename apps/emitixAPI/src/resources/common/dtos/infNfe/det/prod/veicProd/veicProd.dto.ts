import { Type } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TString } from 'src/core/nfe/reusable/types/primitivies_types/TString';

export class veicProdDto {
  @IsNotEmpty({
    message:
      'Tipo da Operação dever ser (1 - Venda concessionária; 2 - Faturamento direto; 3 - Venda direta; 0 - Outros',
  })
  @IsString()
  @IsIn(['0', '1', '2', '3'])
  tpOp: string; //Tipo da Operação (1 - Venda concessionária; 2 - Faturamento direto; 3 - Venda direta; 0 - Outros)

  @IsNotEmpty({
    message:
      'Chassi do veículo - VIN (código-identificação-veículo) é obrigatório',
  })
  @IsString()
  @Length(17)
  @Matches(/^[A-Z0-9]+$/)
  chassi: string; //Chassi do veículo - VIN (código-identificação-veículo)

  @IsNotEmpty({
    message: 'Cor do veículo (código de cada montadora) é obrigatório',
  })
  @Type(() => TString)
  @MinLength(1)
  @MaxLength(4)
  cCor: TString; //Cor do veículo (código de cada montadora)

  @IsNotEmpty({
    message: 'Descrição da cor é obrigatório',
  })
  @MinLength(1)
  @MaxLength(40)
  @Type(() => TString)
  xCor: TString;

  @IsNotEmpty({
    message:
      'Potência máxima do motor do veículo em cavalo vapor (CV). (potência-veículo) é obrigatório',
  })
  @MinLength(1)
  @MaxLength(4)
  @Type(() => TString)
  pot: TString; //Potência máxima do motor do veículo em cavalo vapor (CV). (potência-veículo)

  @IsNotEmpty({
    message:
      'Capacidade voluntária do motor expressa em centímetros cúbicos (CC), (cilindradas)',
  })
  @MinLength(1)
  @MaxLength(4)
  @Type(() => TString)
  cilin: TString; //Capacidade voluntária do motor expressa em centímetros cúbicos (CC). (cilindradas)

  @IsNotEmpty({
    message: 'Peso Líquido é obrigatório',
  })
  @MinLength(1)
  @MaxLength(9)
  @Type(() => TString)
  pesoL: TString; //Peso líquido

  @IsNotEmpty({
    message: 'Peso Bruto é obrigatório',
  })
  @MinLength(1)
  @MaxLength(9)
  @Type(() => TString)
  pesoB: TString; //Peso Bruto

  @IsNotEmpty({
    message: 'Serial (série) é obrigatório',
  })
  @MinLength(1)
  @MaxLength(9)
  @Type(() => TString)
  nSerie: TString; //Serial (serie)

  @IsNotEmpty({
    message:
      'Típo de combustível-Tabela RENAVAM: 01-Álcool; 02-Gasolina; 03-Diesel; 16-Álcool/Gas.; 17-Gas./Álcool/GNV; 18-Gasolina/Elétrico, é obrigatório informar um tipo',
  })
  @MinLength(1)
  @MaxLength(2)
  @Type(() => TString)
  tpComb: TString; //Tipo de combustível-Tabela RENAVAM: 01-Álcool; 02-Gasolina; 03-Diesel; 16-Álcool/Gas.;
  // 17-Gas./Álcool/GNV; 18-Gasolina/Elétrico

  @IsNotEmpty({
    message: 'Número do motor é obrigatório',
  })
  @MinLength(1)
  @MaxLength(21)
  @Type(() => TString)
  nMotor: TString;

  @IsNotEmpty({
    message: 'CMT-Capacidade Máxima de Tração - em Toneladas 4 casas decimais',
  })
  @MinLength(1)
  @MaxLength(9)
  @Type(() => TString)
  CMT: TString; //CMT-Capacidade Máxima de Tração - em Toneladas 4 casas decimais

  @IsNotEmpty({
    message: 'Distância entre eixos é obrigatório ser informado',
  })
  @MinLength(1)
  @MaxLength(4)
  @Type(() => TString)
  dist: TString; //Distancia entre eixos

  @IsNotEmpty({
    message: 'Ano Modelo de Fabricação é obrigatório',
  })
  @IsString()
  @Matches(/^[0-9]{4}$/)
  anoMod: string; //Ano Modelo de Fabricação

  @IsNotEmpty({
    message: 'Ano de Fabricação é obrigatório',
  })
  @IsString()
  @Matches(/^[0-9]{4}$/)
  anoFab: TString; //Ano de Fabricação

  @IsNotEmpty({
    message: 'Tipo de pintura é obrigatório ser informado',
  })
  @Length(1)
  @Type(() => TString)
  tpPint: TString; //Tipo de Pintura

  @IsNotEmpty({
    message: 'Tipo de veículo (utilizar tabela RENAVAM)',
  })
  @IsString()
  @Matches(/^[0-9]{1,2}$/)
  tpVeic: string; //Tipo de veículo (utilizar tabela RENAVAM)

  @IsNotEmpty({
    message: 'Espécie do veículo (utilizar tabela RENAVAM)',
  })
  @IsString()
  @Matches(/^[0-9]{1}$/)
  espVeic: string; //Espécie de veículo (utilizar tabela RENAVAM)

  @IsNotEmpty({
    message:
      'Informar-se o veículo tem VIM (chassi) remarcado R-Remarcado N-NormalVIN',
  })
  @Length(1)
  @Type(() => TString)
  @IsIn(['R', 'N'])
  VIN: TString; //Informa-se o veículo tem VIN (chassi) remarcado.
  //R-Remarcado
  //N-NormalVIN

  @IsNotEmpty({
    message:
      'Condição  do veículo (1 - acabado; 2- inacabado; 3 - semi-acabado)',
  })
  @IsIn(['1', '2', '3'])
  @IsString()
  condVeic: string; //Condição do veículo (1 - acabado; 2 - inacabado; 3 - semi-acabado)

  @IsNotEmpty({
    message: 'Código Marca Modelo (utilizar tabela RENAVAM)',
  })
  @IsString()
  @Matches(/^[0-9]{1,6}$/)
  cMod: string; //Código Marca Modelo (utilizar tabela RENAVAM)

  @IsNotEmpty({
    message:
      'Código da Cor Segundo as regras de pré-cadastro do DENATRAN: 01-AMARELO; 02-AZUL; 03-BEGE; 04-BRANCA; 05-CINZA; 06-DOURADA; 07-GRENA; 08-LARANJA; 09-MARROM; 10-PRATA; 11-PRETA; 12-ROSA; 13-ROXA; 14-VERDE; 15-VERMELHA; 16-FANTASIA',
  })
  /*
  Código da Cor Segundo as regras de pré-cadastro do DENATRAN: 01-AMARELO;02-AZUL;
  03-BEGE;04-BRANCA;05-CINZA;06-DOURADA;07-GRENA 
  08-LARANJA;09-MARROM;10-PRATA;11-PRETA;12-ROSA;13-ROXA;14-VERDE;15-VERMELHA;16-FANTASIA
  */
  @IsString()
  @MinLength(1)
  @MaxLength(2)
  @Matches(/^[0-9]{1,2}$/)
  cCorDENATRAN: string;

  @IsNotEmpty({
    message:
      'Quantidade máxima permitida de passageiros sentados, inclusive motorista.',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(3)
  @Matches(/^[0-9]{1,3}$/)
  lota: string; //Quantidade máxima de permitida de passageiros sentados, inclusive motorista.

  @IsNotEmpty({
    message: `
     Restrição:
      0 - Não há;
      1 - Alienação Fiduciária;
      2 - Arrendamento Mercantil;
      3 - Reserva de Domínio;
      4 - Penhor de Veículos;
      9 - outras.
    `,
  })
  @IsString()
  @IsIn(['0', '1', '2', '3', '4', '9'])
  /*
  Restrição
  0 - Não há;
  1 - Alienação Fiduciária;
  2 - Arrendamento Mercantil;
  3 - Reserva de Domínio;
  4 - Penhor de Veículos;
  9 - outras.
  */
  tpRest: string;
}
