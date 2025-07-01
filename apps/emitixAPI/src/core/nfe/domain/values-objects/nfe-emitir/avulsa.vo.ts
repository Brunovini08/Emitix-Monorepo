export class Avulsa {
  public readonly CNPJ: string;
  public readonly xOrgao: string;
  public readonly matr: string;
  public readonly xAgente: string;
  public readonly fone?: string;
  public readonly UF: string;
  public readonly nDAR?: string;
  public readonly dEmi?: Date;
  public readonly vDAR?: number;
  public readonly repEmi: string;
  public readonly dPag?: Date;
  constructor(data: {
    CNPJ: string;
    xOrgao: string;
    matr: string;
    xAgente: string;
    fone?: string;
    UF: string;
    nDAR?: string;
    dEmi?: Date;
    vDAR?: number;
    repEmi: string;
    dPag?: Date;
  }) {
    this.CNPJ = data.CNPJ;
    this.xOrgao = data.xOrgao;
    this.matr = data.matr;
    this.xAgente = data.xAgente;
    this.fone = data.fone;
    this.UF = data.UF;
    this.nDAR = data.nDAR;
    this.dEmi = data.dEmi;
    this.vDAR = data.vDAR;
    this.repEmi = data.repEmi;
    this.dPag = data.dPag;
    this.dPag = data.dPag;
    this.validateOrThrow();
  }

  public validateOrThrow(): void {
    if (!this.CNPJ || this.CNPJ.length !== 14) {
      throw new Error('CNPJ do Órgão Emitente é obrigatório');
    }
    if (!this.matr || this.matr.trim() === '') {
      throw new Error('Matrícula do Agente é obrigatória');
    }
    if (!this.xAgente || this.xAgente.trim() === '') {
      throw new Error('Nome do Agente é obrigatório');
    }
    if (!this.fone || this.fone.length < 8 || this.fone.length > 15) {
        throw new Error('Telefone inválido. Deve ter entre 8 e 15 dígitos');
    }
    if (!this.UF || this.UF.length !== 2) {
      throw new Error('UF do Órgão Emitente inválida. Deve ter 2 caracteres');
    }
    if (!this.nDAR || this.nDAR.trim() === '') {
      throw new Error('Número do Documento de Arrecadação é obrigatório');
    }
    if (!(this.dEmi instanceof Date) || isNaN(this.dEmi.getTime())) {
      throw new Error('Data de Emissão do DAR inválida');
    }
    if (typeof this.vDAR !== 'number' || this.vDAR < 0) {
      throw new Error('Valor do DAR inválido. Deve ser um número não negativo');
    }
    if (!this.repEmi || this.repEmi.trim() === '') {
      throw new Error('Repartição Fiscal Emitente é obrigatória');
    }
  }

  toJSON() {
    return {
      avulsa: {
        CNPJ: this.CNPJ,
        xOrgao: this.xOrgao,
        matr: this.matr,
        xAgente: this.xAgente,
        fone: this.fone,
        UF: this.UF,
        nDAR: this.nDAR,
        dEmi: this.dEmi,
        vDAR: this.vDAR,
        repEmi: this.repEmi,
        dPag: this.dPag,
      }
    }
  }
}