// domain/value-objects/ide.vo.ts

export class Ide {
  public readonly cUF: string;
  public readonly cNF: string;
  public readonly natOp: string;
  public readonly mod: string;
  public readonly serie: string;
  public readonly nNF: string;
  public readonly dhEmi: Date;
  public readonly tpNF: string;
  public readonly idDest: string;
  public readonly cMunFG: string;
  public readonly tpImp: string;
  public readonly tpEmis: string; // Tipo de Emissão (1=Normal, 2=Contingência FS, etc.)
  public readonly tpAmb: string;
  public readonly finNFe: string;
  public readonly indFinal: string;
  public readonly indPres: string;
  public readonly procEmi: string;
  public readonly verProc: string;
  public readonly dhSaiEnt?: Date; // Data e Hora de Saída/Entrada
  public readonly dhCont?: Date;  // Data e Hora de Entrada em Contingência (Opcional, mas obrigatório se tpEmis != 1)
  public readonly xJust?: string; // Justificativa da Entrada em Contingência (Opcional, mas obrigatório se tpEmis != 1)

  constructor(
    data: {
      cUF: string;
      cNF: string;
      natOp: string;
      mod: string;
      serie: string;
      nNF: string;
      dhEmi: Date;
      tpNF: string;
      idDest: string;
      cMunFG: string;
      tpImp: string;
      tpEmis: string;
      tpAmb: string;
      finNFe: string;
      indFinal: string;
      indPres: string;
      procEmi: string;
      verProc: string;
      dhSaiEnt?: Date;
      dhCont?: Date; // Espera um Date aqui para melhor tipagem
      xJust?: string;
    },
  ) {
    this.cUF = data.cUF;
    this.cNF = data.cNF;
    this.natOp = data.natOp;
    this.mod = data.mod;
    this.serie = data.serie;
    this.nNF = data.nNF;
    this.dhEmi = data.dhEmi;
    this.tpNF = data.tpNF;
    this.idDest = data.idDest;
    this.cMunFG = data.cMunFG;
    this.tpImp = data.tpImp;
    this.tpEmis = data.tpEmis;
    this.tpAmb = data.tpAmb;
    this.finNFe = data.finNFe;
    this.indFinal = data.indFinal;
    this.indPres = data.indPres;
    this.procEmi = data.procEmi;
    this.verProc = data.verProc;
    this.dhSaiEnt = data.dhSaiEnt;
    this.dhCont = data.dhCont;
    this.xJust = data.xJust;

    // A validação de consistência será feita no método validateOrThrow
    this.validateOrThrow();
  }

  public getNumeroFormatado(): string {
    return `${this.serie}-${this.nNF}`;
  }

  /**
   * Valida as regras de negócio para o Value Object Ide.
   * Lança um erro específico se alguma validação falhar.
   */
  public validateOrThrow(): void {
    if (this.cUF.length !== 2) {
      throw new Error('Código da UF (cUF) inválido. Deve ter 2 dígitos.');
    }
    if (this.tpNF !== '0' && this.tpNF !== '1') {
      throw new Error('Tipo de Operação (tpNF) inválido. Deve ser "0" (Entrada) ou "1" (Saída).');
    }
    // Adicione outras validações básicas aqui, se houver

    // --- Regra condicional: dhCont e xJust devem ser informados se tpEmis for diferente de 1 ---
    if (this.tpEmis !== '1') {
      if (!this.dhCont) {
        throw new Error('Data e Hora de Entrada em Contingência (dhCont) é obrigatório quando tpEmis for diferente de "1".');
      }
      if (!this.xJust || this.xJust.trim() === '') {
        throw new Error('Justificativa da Entrada em Contingência (xJust) é obrigatória quando tpEmis for diferente de "1".');
      }
      // Você também pode adicionar validações de tamanho/formato para xJust aqui
      if (this.xJust.length < 15 || this.xJust.length > 256) {
          throw new Error('Justificativa (xJust) deve ter entre 15 e 256 caracteres.');
      }
    } else {
      // Se tpEmis for '1' (Normal), esses campos NÃO DEVEM ser informados
      if (this.dhCont) {
        throw new Error('Data e Hora de Entrada em Contingência (dhCont) não deve ser informada quando tpEmis for "1" (Normal).');
      }
      if (this.xJust && this.xJust.trim() !== '') {
        throw new Error('Justificativa (xJust) não deve ser informada quando tpEmis for "1" (Normal).');
      }
    }
  }
}