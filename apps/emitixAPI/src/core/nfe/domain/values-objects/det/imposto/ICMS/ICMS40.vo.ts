const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMS40 {
  public readonly orig;
  public readonly CST;
  public readonly vICMSDeson?: string;
  public readonly motDesICMS?: string;
  public readonly indDeduzDeson?: string;

  constructor(data: { orig: string, CST: string, vICMSDeson?: string, motDesICMS?: string, indDeduzDeson?: string }) {
    this.orig = data.orig;
    this.CST = data.CST;
    this.vICMSDeson = data.vICMSDeson ?? undefined;
    this.motDesICMS = data.motDesICMS ?? undefined;
    this.indDeduzDeson = data.indDeduzDeson ?? undefined;

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    if (this.orig === undefined || !(Object.values(TorigEnum).includes(this.orig))) {
      throw new Error(`
        Origem da mercadoria (orig) é obrigatória e deve ser um dos seguintes valores:
        ${Object.values(TorigEnum).join(', ')} (0 - Nacional, 1 - Estrangeira - Importação direta, 2 - Estrangeira - Adquirida no mercado interno)
      `);
    }

    const allowedCST = ['40', '41', '50'];
    if (this.CST === undefined || typeof this.CST !== 'string' || !allowedCST.includes(this.CST)) {
      throw new Error(`
        CST (Código de Situação Tributária) do ICMS é obrigatório e deve ser '40', '41' ou '50'.
        40 - Isenta; 41 - Não tributada; 50 - Suspensão
      `);
    }

    if (this.vICMSDeson !== null && (typeof this.vICMSDeson !== 'string' || this.vICMSDeson.trim() === '')) {
      throw new Error('Valor do ICMS desonerado (vICMSDeson) deve ser um número não negativo, se informado.');
    }

    const allowedMotDesICMS = ['1', '3', '4', '5', '6', '7', '8', '9', '10', '11', '16', '90'];
    if (this.motDesICMS !== undefined && typeof this.motDesICMS !== 'string' && !allowedMotDesICMS.includes(this.motDesICMS)) {
        throw new Error(`Motivo da desoneração do ICMS (motDesICMS) deve ser um dos valores válidos: '1', '3', '4', '5', '6', '7', '8', '9', '10', '11', '16', '90', se informado.`);
    }

    const allowedIndDeduzDeson = ['0', '1'];
    if (this.indDeduzDeson !== undefined && typeof this.indDeduzDeson !== 'string' && !allowedIndDeduzDeson.includes(this.indDeduzDeson)) {
        throw new Error(`Indica se o valor do ICMS desonerado deduz do valor do item (indDeduzDeson) deve ser '0' ou '1', se informado.`);
    }
  }

  public equals(other) {
    if (!(other instanceof ICMS40)) {
      return false;
    }
    return (
      this.orig === other.orig &&
      this.CST === other.CST &&
      this.vICMSDeson === other.vICMSDeson &&
      this.motDesICMS === other.motDesICMS &&
      this.indDeduzDeson === other.indDeduzDeson
    );
  }

  public toJSON() {
    return {
      ICMS40: {
        orig: this.orig,
        CST: this.CST,
        vICMSDeson: this.vICMSDeson,
        motDesICMS: this.motDesICMS,
        indDeduzDeson: this.indDeduzDeson,
      }
    };
  }
}