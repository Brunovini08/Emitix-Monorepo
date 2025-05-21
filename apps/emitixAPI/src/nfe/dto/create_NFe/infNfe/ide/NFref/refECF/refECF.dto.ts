import { IsIn, IsNotEmpty, IsString, Matches } from 'class-validator';

export class refECFDto {
  @IsString()
  @IsNotEmpty({
    message:
      'Código do modelo do Documento Fiscal Preencher com &quot;2B&quot;, quando se tratar de Cupom Fiscal emitido por máquina registradora (não ECF), com &quot;2C&quot;, quando se tratar de Cupom Fiscal PDV, ou &quot;2D&quot;, quando se tratar de Cupom Fiscal (emitido por ECF)',
  })
  @IsIn(['2B', '2C', '2D'], {
    message:
      'Código inválido, Código do modelo do Documento Fiscal deve ser 2B, 2C ou 2D.',
  })
  mod: string;

  @IsString()
  @IsNotEmpty({
    message:
      'Informar o número de ordem sequenciaal do ECF que emitiu o Cupom FIscal vinculado à NF-e',
  })
  @Matches(/^[0-9]{1,3}$/, {
    message:
      'Número de ordem sequencial do ECF deve ter entre 1 e 3 dígitos numéricos.',
  })
  nECF: string;

  @IsString()
  @IsNotEmpty({
    message: 'Número do Contador de Ordem de Operação - C00 vinculado à NF-e',
  })
  @Matches(/^[0-9]{1,6}$/, {
    message:
      'Número do Contador de Ordem de Operação - C00 deve ter entre 1 e 6 dígitos numéricos.',
  })
  nC00: string;
}
