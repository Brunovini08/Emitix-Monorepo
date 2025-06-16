const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMSSN102 {
  public readonly orig;
  public readonly CSOSN;

  constructor(data) {
    this.orig = data.orig ?? null; // orig is optional in the DTO
    this.CSOSN = data.CSOSN;

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    if (this.orig !== null && !(Object.values(TorigEnum).includes(this.orig))) {
      throw new Error(`
        Origem da mercadoria (orig) deve ser um dos seguintes valores, se informada:
        ${Object.values(TorigEnum).join(', ')} (0 - Nacional, 1 - Estrangeira - Importação direta, 2 - Estrangeira - Adquirida no mercado interno)
      `);
    }

    const allowedCSOSN = ['102', '103', '300', '400'];
    if (this.CSOSN === undefined || typeof this.CSOSN !== 'string' || !allowedCSOSN.includes(this.CSOSN)) {
      throw new Error(`
        CSOSN (Código de Situação da Operação – Simples Nacional) é obrigatório e deve ser um dos seguintes:
        102 - Tributada pelo Simples Nacional sem permissão de crédito;
        103 - Isenção do ICMS no Simples Nacional para faixa de receita bruta;
        300 - Imune;
        400 - Não tributada pelo Simples Nacional.
      `);
    }
  }

  public equals(other) {
    if (!(other instanceof ICMSSN102)) {
      return false;
    }
    return (
      this.orig === other.orig &&
      this.CSOSN === other.CSOSN
    );
  }

  public toJSON() {
    return {
      orig: this.orig,
      CSOSN: this.CSOSN,
    };
  }
}