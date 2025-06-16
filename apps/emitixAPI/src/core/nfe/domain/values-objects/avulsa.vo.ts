// src/domain/nfe/value-objects/avulsa.vo.ts

export class Avulsa {
  public readonly CNPJ: string;    // CNPJ do Órgão Emitente
  public readonly xOrgao: string;  // Nome do Órgão Emitente
  public readonly matr: string;    // Matrícula do Agente
  public readonly xAgente: string; // Nome do Agente
  public readonly fone: string;    // Telefone do Órgão/Agente
  public readonly UF: string;      // UF do Órgão Emitente
  public readonly nDAR: string;    // Número do Documento de Arrecadação de Receitas (DAR)
  public readonly dEmiDAR: Date;   // Data de Emissão do DAR
  public readonly vDAR: number;    // Valor do DAR
  public readonly repEmi: string;  // Repartição Fiscal Emitente
  public readonly dhRegDPEC?: Date; // Data e Hora do Registro do DPEC (Opcional)

  constructor(data: {
    CNPJ: string;
    xOrgao: string;
    matr: string;
    xAgente: string;
    fone: string;
    UF: string;
    nDAR: string;
    dEmiDAR: Date; // Espera um Date aqui
    vDAR: number;
    repEmi: string;
    dhRegDPEC?: Date; // Espera um Date aqui
  }) {
    this.CNPJ = data.CNPJ;
    this.xOrgao = data.xOrgao;
    this.matr = data.matr;
    this.xAgente = data.xAgente;
    this.fone = data.fone;
    this.UF = data.UF;
    this.nDAR = data.nDAR;
    this.dEmiDAR = data.dEmiDAR;
    this.vDAR = data.vDAR;
    this.repEmi = data.repEmi;
    this.dhRegDPEC = data.dhRegDPEC;

    this.validateOrThrow(); // Valida na construção
  }

  /**
   * Valida as regras de negócio para o Value Object Avulsa.
   * Lança um erro específico se alguma validação falhar.
   */
  public validateOrThrow(): void {
    if (!this.CNPJ || this.CNPJ.length !== 14) {
      throw new Error('CNPJ do Órgão Emitente (Avulsa) é obrigatório e deve ter 14 dígitos.');
    }
    if (!this.xOrgao || this.xOrgao.trim() === '') {
      throw new Error('Nome do Órgão Emitente (Avulsa) é obrigatório.');
    }
    if (!this.matr || this.matr.trim() === '') {
      throw new Error('Matrícula do Agente (Avulsa) é obrigatória.');
    }
    if (!this.xAgente || this.xAgente.trim() === '') {
      throw new Error('Nome do Agente (Avulsa) é obrigatório.');
    }
    if (!this.fone || this.fone.length < 8 || this.fone.length > 15) { // Exemplo de validação de telefone
        throw new Error('Telefone (Avulsa) inválido. Deve ter entre 8 e 15 dígitos.');
    }
    if (!this.UF || this.UF.length !== 2) {
      throw new Error('UF do Órgão Emitente (Avulsa) inválida. Deve ter 2 caracteres.');
    }
    if (!this.nDAR || this.nDAR.trim() === '') {
      throw new Error('Número do Documento de Arrecadação (nDAR) é obrigatório.');
    }
    if (!(this.dEmiDAR instanceof Date) || isNaN(this.dEmiDAR.getTime())) {
      throw new Error('Data de Emissão do DAR (dEmiDAR) inválida.');
    }
    if (typeof this.vDAR !== 'number' || this.vDAR < 0) {
      throw new Error('Valor do DAR (vDAR) inválido. Deve ser um número não negativo.');
    }
    if (!this.repEmi || this.repEmi.trim() === '') {
      throw new Error('Repartição Fiscal Emitente (repEmi) é obrigatória.');
    }
    // Se dhRegDPEC estiver presente, validar se é uma data válida
    if (this.dhRegDPEC && (!(this.dhRegDPEC instanceof Date) || isNaN(this.dhRegDPEC.getTime()))) {
      throw new Error('Data e Hora do Registro do DPEC (dhRegDPEC) inválida.');
    }
  }

  // Você pode adicionar métodos de comportamento aqui, se houver lógica específica para 'Avulsa'
  public hasDPECRegistered(): boolean {
      return !!this.dhRegDPEC;
  }
}