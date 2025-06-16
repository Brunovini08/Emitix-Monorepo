export class GCred {
  public readonly cCredPresumido: string;
  public readonly pCredPresumido: number;
  public readonly vCredPresumido: number;

  constructor(data: {
    cCredPresumido: string;
    pCredPresumido: number;
    vCredPresumido: number;
  }) {
    this.cCredPresumido = data.cCredPresumido;
    this.pCredPresumido = data.pCredPresumido;
    this.vCredPresumido = data.vCredPresumido;

    this.validateOrThrow();
  }

  public validateOrThrow(): void {
    if (!this.cCredPresumido || this.cCredPresumido.trim() === '') {
      throw new Error('Código do Crédito Presumido (cCredPresumido) é obrigatório.');
    }
    if (typeof this.pCredPresumido !== 'number' || this.pCredPresumido < 0) {
      throw new Error('Percentual do Crédito Presumido (pCredPresumido) deve ser um número não negativo.');
    }
    if (typeof this.vCredPresumido !== 'number' || this.vCredPresumido < 0) {
      throw new Error('Valor do Crédito Presumido (vCredPresumido) deve ser um número não negativo.');
    }
  }
}