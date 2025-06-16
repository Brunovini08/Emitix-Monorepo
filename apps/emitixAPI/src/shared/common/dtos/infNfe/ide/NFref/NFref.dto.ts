import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { refNFDto } from './refNF/refNF.dto';
import { refNFPDto } from './refNFP/refNFP.dto';
import { refECFDto } from './refECF/refECF.dto';
import { TChNFe } from 'src/core/nfe/domain/types/primitivies_types/TChNFe';

export class NFrefDto {
  @IsNotEmpty({
    message:
      'Chave de acesso das NF-e referenciadas. Chave de acesso compostas por Código da UF (tabela do IBGE) + AAMM da emissão + CNPJ do Emitente + modelo, série e número da NF-e Referenciada + Código Numérico + DV.',
  })
  @Type(() => TChNFe)
  refNFe: TChNFe;

  @IsNotEmpty({
    message:
      'Referencia uma NF-e (modelo 55) emitida anteriormente pela sua Chave de Acesso com código numérico zerado, permitindo manter o sigilo da NF-e referenciada.',
  })
  @Type(() => TChNFe)
  refNFeSig: TChNFe;

  @IsNotEmpty({})
  @ValidateNested()
  @Type(() => refNFDto)
  refNF: refNFDto;

  @IsNotEmpty({})
  @ValidateNested()
  @Type(() => refNFPDto)
  refNFP: refNFPDto;

  @IsNotEmpty({
    message:
      'Utilizar esta TAG para referenciar um CT-e emitido anteriormente, vinculada a NF-e atual',
  })
  @Type(() => TChNFe)
  refCTe: TChNFe;

  @IsNotEmpty({
    message: 'Grupo do Cupom Fiscal vinculado à NF-e',
  })
  @ValidateNested()
  @Type(() => refECFDto)
  refECF: refECFDto;
}
