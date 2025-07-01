export class RetConsReciNFe {
  public readonly tpAmb: string;
  public readonly verAplic: string;
  public readonly cStat: string;
  public readonly xMotivo: string;
  public readonly infProt?: any; // Crie um VO específico se quiser detalhar

  constructor(data: {
    tpAmb: string;
    verAplic: string;
    cStat: string;
    xMotivo: string;
    infProt?: any;
  }) {
    this.tpAmb = data.tpAmb;
    this.verAplic = data.verAplic;
    this.cStat = data.cStat;
    this.xMotivo = data.xMotivo;
    this.infProt = data.infProt || undefined
    this.validateOrThrow();
  }

  public validateOrThrow() {
    if (!this.tpAmb) throw new Error('tpAmb é obrigatório');
    if (!this.verAplic) throw new Error('verAplic é obrigatório');
    if (!this.cStat) throw new Error('cStat é obrigatório');
    if (!this.xMotivo) throw new Error('xMotivo é obrigatório');
  }

  public toJSON() {
    return {
      tpAmb: this.tpAmb,
      verAplic: this.verAplic,
      cStat: this.cStat,
      xMotivo: this.xMotivo,
      infProt: this.infProt ? this.infProt : undefined
    };
  }
} 