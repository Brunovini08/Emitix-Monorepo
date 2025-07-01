export class ISSQN {
  public readonly vBC;
  public readonly vAliq;
  public readonly vISSQN;
  public readonly cMunFG;
  public readonly cListServ;
  public readonly vDeducao;
  public readonly vOutro;
  public readonly vDescIncond;
  public readonly vDescCond;
  public readonly vISSRet;
  public readonly indISS;
  public readonly cServico;
  public readonly cMun;
  public readonly cPais;
  public readonly nProcesso;
  public readonly indIncentivo;

  constructor(data: {
    vBC: number
    vAliq: number
    vISSQN: number
    cMunFG: string
    cListServ: string
    vDeducao: number
    vOutro: number
    vDescIncond: number
    vDescCond: number
    vISSRet: number
    indISS: string
    cServico: string
    cMun: string
    cPais: string
    nProcesso: string
    indIncentivo: string
  }) {
    this.vBC = data.vBC;
    this.vAliq = data.vAliq;
    this.vISSQN = data.vISSQN;
    this.cMunFG = data.cMunFG;
    this.cListServ = data.cListServ;
    this.vDeducao = data.vDeducao ?? null;
    this.vOutro = data.vOutro ?? null;
    this.vDescIncond = data.vDescIncond ?? null;
    this.vDescCond = data.vDescCond ?? null;
    this.vISSRet = data.vISSRet ?? null;
    this.indISS = data.indISS;
    this.cServico = data.cServico ?? null;
    this.cMun = data.cMun ?? null;
    this.cPais = data.cPais ?? null;
    this.nProcesso = data.nProcesso ?? null;
    this.indIncentivo = data.indIncentivo;

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    if (typeof this.vBC !== 'number' || this.vBC < 0) {
      throw new Error('Valor da BC do ISSQN (vBC) é obrigatório e deve ser um número não negativo.');
    }

    if (typeof this.vAliq !== 'number' || this.vAliq < 0 || this.vAliq > 100) {
      throw new Error('Alíquota do ISSQN (vAliq) é obrigatória e deve ser um número entre 0 e 100.');
    }

    if (typeof this.vISSQN !== 'number' || this.vISSQN < 0) {
      throw new Error('Valor do ISSQN (vISSQN) é obrigatório e deve ser um número não negativo.');
    }

    if (typeof this.cMunFG !== 'string' || this.cMunFG.length === 0) {
      throw new Error('Município de ocorrência do fato gerador do ISSQN (cMunFG) é obrigatório.');
    }

    if (typeof this.cListServ !== 'string' || this.cListServ.length === 0) {
      throw new Error('Item da lista de serviços (cListServ) é obrigatório.');
    }

    if (this.vDeducao !== null && (typeof this.vDeducao !== 'number' || this.vDeducao < 0)) {
      throw new Error('Valor da dedução (vDeducao) deve ser um número não negativo, se informado.');
    }

    if (this.vOutro !== null && (typeof this.vOutro !== 'number' || this.vOutro < 0)) {
      throw new Error('Outros valores (vOutro) deve ser um número não negativo, se informado.');
    }

    if (this.vDescIncond !== null && (typeof this.vDescIncond !== 'number' || this.vDescIncond < 0)) {
      throw new Error('Valor do desconto incondicionado (vDescIncond) deve ser um número não negativo, se informado.');
    }

    if (this.vDescCond !== null && (typeof this.vDescCond !== 'number' || this.vDescCond < 0)) {
      throw new Error('Valor do desconto condicionado (vDescCond) deve ser um número não negativo, se informado.');
    }

    if (this.vISSRet !== null && (typeof this.vISSRet !== 'number' || this.vISSRet < 0)) {
      throw new Error('Valor do ISSQN retido (vISSRet) deve ser um número não negativo, se informado.');
    }

    const allowedIndISS = ['1', '2', '3', '4', '5', '6', '7'];
    if (typeof this.indISS !== 'string' || !allowedIndISS.includes(this.indISS)) {
      throw new Error(`
        Exigibilidade do ISS (indISS) é obrigatória e deve ser um dos seguintes:
        1-Exigível; 2-Não incidente; 3-Isenção; 4-Exportação; 5-Imunidade; 6-Exig Susp Judicial; 7-Exig Susp ADM
      `);
    }

    if (this.cServico !== null && (typeof this.cServico !== 'string' || this.cServico.length < 1 || this.cServico.length > 20)) {
      throw new Error('Código do serviço (cServico) deve ser uma string com 1 a 20 caracteres, se informado.');
    }

    if (this.cMun !== null && (typeof this.cMun !== 'string' || this.cMun.length === 0)) {
      throw new Error('Código do município (cMun) deve ser uma string válida, se informado.');
    }

    if (this.cPais !== null && (typeof this.cPais !== 'string' || !/^[0-9]{1,4}$/.test(this.cPais))) {
      throw new Error('Código do país (cPais) deve ser uma string de 1 a 4 dígitos numéricos, se informado.');
    }

    if (this.nProcesso !== null && (typeof this.nProcesso !== 'string' || this.nProcesso.length < 1 || this.nProcesso.length > 30)) {
      throw new Error('Número do processo (nProcesso) deve ser uma string com 1 a 30 caracteres, se informado.');
    }

    const allowedIndIncentivo = ['1', '2'];
    if (typeof this.indIncentivo !== 'string' || !allowedIndIncentivo.includes(this.indIncentivo)) {
      throw new Error('Indicador de Incentivo Fiscal (indIncentivo) é obrigatório e deve ser "1" (Sim) ou "2" (Não).');
    }
  }

  public equals(other) {
    if (!(other instanceof ISSQN)) {
      return false;
    }
    return (
      this.vBC === other.vBC &&
      this.vAliq === other.vAliq &&
      this.vISSQN === other.vISSQN &&
      this.cMunFG === other.cMunFG &&
      this.cListServ === other.cListServ &&
      this.vDeducao === other.vDeducao &&
      this.vOutro === other.vOutro &&
      this.vDescIncond === other.vDescIncond &&
      this.vDescCond === other.vDescCond &&
      this.vISSRet === other.vISSRet &&
      this.indISS === other.indISS &&
      this.cServico === other.cServico &&
      this.cMun === other.cMun &&
      this.cPais === other.cPais &&
      this.nProcesso === other.nProcesso &&
      this.indIncentivo === other.indIncentivo
    );
  }

  public toJSON() {
    return {
      vBC: this.vBC,
      vAliq: this.vAliq,
      vISSQN: this.vISSQN,
      cMunFG: this.cMunFG,
      cListServ: this.cListServ,
      vDeducao: this.vDeducao,
      vOutro: this.vOutro,
      vDescIncond: this.vDescIncond,
      vDescCond: this.vDescCond,
      vISSRet: this.vISSRet,
      indISS: this.indISS,
      cServico: this.cServico,
      cMun: this.cMun,
      cPais: this.cPais,
      nProcesso: this.nProcesso,
      indIncentivo: this.indIncentivo,
    };
  }
}