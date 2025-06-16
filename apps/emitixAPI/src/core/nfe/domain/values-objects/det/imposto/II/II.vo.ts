export class II {
  public readonly vBC;
  public readonly vDespAdu;
  public readonly vII;
  public readonly vIOF;


  constructor(data) {
    this.vBC = data.vBC;
    this.vDespAdu = data.vDespAdu;
    this.vII = data.vII;
    this.vIOF = data.vIOF;

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    if (typeof this.vBC !== 'number' || this.vBC < 0) {
      throw new Error('Base da BC do Imposto de Importação (vBC) é obrigatória e deve ser um número não negativo.');
    }

    if (typeof this.vDespAdu !== 'number' || this.vDespAdu < 0) {
      throw new Error('Valor das despesas aduaneiras (vDespAdu) é obrigatório e deve ser um número não negativo.');
    }

    if (typeof this.vII !== 'number' || this.vII < 0) {
      throw new Error('Valor do Imposto de Importação (vII) é obrigatório e deve ser um número não negativo.');
    }

    if (typeof this.vIOF !== 'number' || this.vIOF < 0) {
      throw new Error('Valor do Imposto sobre Operações Financeiras (vIOF) é obrigatório e deve ser um número não negativo.');
    }
  }

  public equals(other) {
    if (!(other instanceof II)) {
      return false;
    }
    return (
      this.vBC === other.vBC &&
      this.vDespAdu === other.vDespAdu &&
      this.vII === other.vII &&
      this.vIOF === other.vIOF
    );
  }

  public toJSON() {
    return {
      vBC: this.vBC,
      vDespAdu: this.vDespAdu,
      vII: this.vII,
      vIOF: this.vIOF,
    };
  }
}