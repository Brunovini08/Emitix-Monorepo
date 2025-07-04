import { DomainError } from "src/core/nfe/domain/errors/domain.error";

const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMSSN202 {
  public readonly orig;
  public readonly CSOSN;
  public readonly modBCST;
  public readonly pMVAST;
  public readonly pRedBCST;
  public readonly vBCST;
  public readonly pICMSST;
  public readonly vICMSST;
  public readonly vBCFCPST;
  public readonly pFCPST;
  public readonly vFCPST;

  constructor(data: {
    orig: string,
    CSOSN: string,
    modBCST: string,
    pMVAST: string,
    pRedBCST: string,
    vBCST: string,
    pICMSST: string,
    vICMSST: string,
    vBCFCPST: string,
    pFCPST: string,
    vFCPST: string,
  }) {
    this.orig = data.orig;
    this.CSOSN = data.CSOSN;
    this.modBCST = data.modBCST;
    this.pMVAST = data.pMVAST;
    this.pRedBCST = data.pRedBCST;
    this.vBCST = data.vBCST;
    this.pICMSST = data.pICMSST;
    this.vICMSST = data.vICMSST;
    this.vBCFCPST = data.vBCFCPST;
    this.pFCPST = data.pFCPST;
    this.vFCPST = data.vFCPST;

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    if (this.orig === undefined || !(Object.values(TorigEnum).includes(this.orig))) {
      throw new DomainError(`
        Origem da mercadoria (orig) é obrigatória e deve ser um dos seguintes valores:
        ${Object.values(TorigEnum).join(', ')} (0 - Nacional, 1 - Estrangeira - Importação direta, 2 - Estrangeira - Adquirida no mercado interno)
      `);
    }

    const allowedCSOSN = ['202', '203'];
    if (this.CSOSN === undefined || typeof this.CSOSN !== 'string' || !allowedCSOSN.includes(this.CSOSN)) {
      throw new DomainError(`
        CSOSN (Código de Situação da Operação – Simples Nacional) é obrigatório e deve ser '202' ou '203'.
        202 - Tributada pelo Simples Nacional sem permissão de crédito e com cobrança do ICMS por Substituição Tributária;
        203 - Isenção do ICMS nos Simples Nacional para faixa de receita bruta e com cobrança do ICMS por Substituição Tributária.
      `);
    }

    const allowedModBCST = ['0', '1', '2', '3', '4', '5', '6'];
    if (this.modBCST === undefined || typeof this.modBCST !== 'string' || !allowedModBCST.includes(this.modBCST)) {
      throw new DomainError(`
        Modalidade de determinação da BC do ICMS ST (modBCST) é obrigatória e deve ser uma das seguintes:
        0 - Preço tabelado ou máximo sugerido; 1 - Lista Negativa (valor); 2 - Lista Positiva (valor); 3 - Lista Neutra (valor);
        4 - Margem Valor Agregado (%); 5 - Pauta (valor); 6 - Valor da Operação.
      `);
    }

    if (this.pMVAST !== null && (typeof this.pMVAST !== 'string' || this.pMVAST.trim() === '')) {
      throw new DomainError('Percentual da Margem de Valor Adicionado (pMVAST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.pRedBCST !== null && (typeof this.pRedBCST !== 'string' || this.pRedBCST.trim() === '')) {
      throw new DomainError('Percentual de redução da BC do ICMS ST (pRedBCST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vBCST !== null && (typeof this.vBCST !== 'string' || this.vBCST.trim() === '')) {
      throw new DomainError('Valor da BC do ICMS ST (vBCST) deve ser um número não negativo, se informado.');
    }

    if (typeof this.pICMSST !== 'string' || this.pICMSST.trim() === '') {
      throw new DomainError('Alíquota do ICMS ST (pICMSST) é obrigatória e deve ser um número entre 0 e 100.');
    }

    if (typeof this.vICMSST !== 'string' || this.vICMSST.trim() === '') {
      throw new DomainError('Valor do ICMS ST (vICMSST) é obrigatório e deve ser um número não negativo.');
    }

    if (this.vBCFCPST !== null && (typeof this.vBCFCPST !== 'string' || this.vBCFCPST.trim() === '')) {
      throw new DomainError('Valor da BC do ICMS FCP (vBCFCPST) deve ser um número não negativo, se informado.');
    }

    if (this.pFCPST !== null && (typeof this.pFCPST !== 'string' || this.pFCPST.trim() === '')) {
      throw new DomainError('Percentual do ICMS FCP ST (pFCPST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vFCPST !== null && (typeof this.vFCPST !== 'string' || this.vFCPST.trim() === '')) {
      throw new DomainError('Valor do ICMS FCP ST (vFCPST) deve ser um número não negativo, se informado.');
    }
  }

  public equals(other) {
    if (!(other instanceof ICMSSN202)) {
      return false;
    }
    return (
      this.orig === other.orig &&
      this.CSOSN === other.CSOSN &&
      this.modBCST === other.modBCST &&
      this.pMVAST === other.pMVAST &&
      this.pRedBCST === other.pRedBCST &&
      this.vBCST === other.vBCST &&
      this.pICMSST === other.pICMSST &&
      this.vICMSST === other.vICMSST &&
      this.vBCFCPST === other.vBCFCPST &&
      this.pFCPST === other.pFCPST &&
      this.vFCPST === other.vFCPST
    );
  }

  public toJSON() {
    return {
      ICMSSN202: {
        orig: this.orig,
        CSOSN: this.CSOSN,
        modBCST: this.modBCST,
        pMVAST: this.pMVAST,
        pRedBCST: this.pRedBCST,
        vBCST: this.vBCST,
        pICMSST: this.pICMSST,
        vICMSST: this.vICMSST,
        vBCFCPST: this.vBCFCPST,
        pFCPST: this.pFCPST,
        vFCPST: this.vFCPST,
      }
    };
  }
}