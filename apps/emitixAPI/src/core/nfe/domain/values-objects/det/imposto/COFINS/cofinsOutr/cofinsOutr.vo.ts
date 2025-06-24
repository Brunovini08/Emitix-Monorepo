import type { BaseCalc } from "./baseCalc.vo";
import type { Quant } from "./quant.vo";

export class COFINSOutr {
  public readonly CST: string;
  public readonly baseCalc: BaseCalc;
  public readonly quant: Quant;
  public readonly vCOFINS: number;

  constructor(data: { CST: string, baseCalc: BaseCalc, quant: Quant, vCOFINS: number }) {
    this.CST = data.CST;
    this.baseCalc = data.baseCalc 
    this.quant = data.quant 
    this.vCOFINS = data.vCOFINS;

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    const allowedCST = [
      '49', '50', '51', '52', '53', '54', '55', '56', '60', '61', '62', '63',
      '64', '65', '66', '67', '70', '71', '72', '73', '74', '75', '98', '99',
    ];
    if (typeof this.CST !== 'string' || !allowedCST.includes(this.CST)) {
      throw new Error(`
        Código de Situação Tributária do COFINS (CST) é obrigatório e deve ser um dos seguintes:
        49 - Outras Operações de Saída
        50 - Operação com Direito a Crédito - Vinculada Exclusivamente a Receita Tributada no Mercado Interno
        51 - Operação com Direito a Crédito – Vinculada Exclusivamente a Receita Não Tributada no Mercado Interno
        52 - Operação com Direito a Crédito - Vinculada Exclusivamente a Receita de Exportação
        53 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno
        54 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas no Mercado Interno e de Exportação
        55 - Operação com Direito a Crédito - Vinculada a Receitas Não-Tributadas no Mercado Interno e de Exportação
        56 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno, e de Exportação
        60 - Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Tributada no Mercado Interno
        61 - Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Não-Tributada no Mercado Interno
        62 - Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita de Exportação
        63 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno
        64 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas no Mercado Interno e de Exportação
        65 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Não-Tributadas no Mercado Interno e de Exportação
        66 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno, e de Exportação
        67 - Crédito Presumido - Outras Operações
        70 - Operação de Aquisição sem Direito a Crédito
        71 - Operação de Aquisição com Isenção
        72 - Operação de Aquisição com Suspensão
        73 - Operação de Aquisição a Alíquota Zero
        74 - Operação de Aquisição sem Incidência da Contribuição
        75 - Operação de Aquisição por Substituição Tributária
        98 - Outras Operações de Entrada
        99 - Outras Operações.
      `);
    }

    if (this.baseCalc && this.quant) {
      throw new Error('Apenas um dos campos "baseCalc" ou "quant" pode ser preenchido.');
    }

    if (this.baseCalc) {
      this.baseCalc.validateOrThrow();
    }

    if (this.quant) {
      this.quant.validateOrThrow();
    }

    if (typeof this.vCOFINS !== 'number' || this.vCOFINS < 0) {
      throw new Error('Valor do COFINS (vCOFINS) é obrigatório e deve ser um número não negativo.');
    }
  }

  public equals(other) {
    if (!(other instanceof COFINSOutr)) {
      return false;
    }
    return (
      this.CST === other.CST &&
      (this.baseCalc ? this.baseCalc.equals(other.baseCalc) : this.baseCalc === other.baseCalc) &&
      (this.quant ? this.quant.equals(other.quant) : this.quant === other.quant) &&
      this.vCOFINS === other.vCOFINS
    );
  }

  public toJSON() {
    return {
      CST: this.CST,
      baseCalc: this.baseCalc ? this.baseCalc.toJSON() : null,
      quant: this.quant ? this.quant.toJSON() : null,
      vCOFINS: this.vCOFINS,
    };
  }
}