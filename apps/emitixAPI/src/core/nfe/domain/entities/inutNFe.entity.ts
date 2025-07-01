export class InutNFe {
  public readonly tpAmb: string;
  public readonly xServ: string;
  public readonly cUF: string;
  public readonly ano: string;
  public readonly CNPJ: string;
  public readonly mod: string;
  public readonly serie: string;
  public readonly nNFIni: string;
  public readonly nNFFin: string;
  public readonly xJust: string;

  constructor(data: {
    tpAmb: string;
    xServ: string;
    cUF: string;
    ano: string;
    CNPJ: string;
    mod: string;
    serie: string;
    nNFIni: string;
    nNFFin: string;
    xJust: string;
  }) {
    this.tpAmb = data.tpAmb;
    this.xServ = data.xServ;
    this.cUF = data.cUF;
    this.ano = data.ano;
    this.CNPJ = data.CNPJ;
    this.mod = data.mod;
    this.serie = data.serie;
    this.nNFIni = data.nNFIni;
    this.nNFFin = data.nNFFin;
    this.xJust = data.xJust;
    this.validateOrThrow();
  }

  public validateOrThrow() {
    if (!this.tpAmb) throw new Error('tpAmb é obrigatório');
    if (!this.xServ) throw new Error('xServ é obrigatório');
    if (!this.cUF) throw new Error('cUF é obrigatório');
    if (!this.ano) throw new Error('ano é obrigatório');
    if (!this.CNPJ) throw new Error('CNPJ é obrigatório');
    if (!this.mod) throw new Error('mod é obrigatório');
    if (!this.serie) throw new Error('serie é obrigatório');
    if (!this.nNFIni) throw new Error('nNFIni é obrigatório');
    if (!this.nNFFin) throw new Error('nNFFin é obrigatório');
    if (!this.xJust) throw new Error('xJust é obrigatório');
  }
} 