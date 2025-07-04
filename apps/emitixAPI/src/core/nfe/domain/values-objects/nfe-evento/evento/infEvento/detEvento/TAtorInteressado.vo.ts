import { DomainError } from 'src/core/nfe/domain/errors/domain.error';

export class TAtorInteressadoVO {
  versao: string;
  descEvento: string;
  cOrgaoAutor: string;
  tpAutor: string;
  verAplic?: string | undefined;

  constructor(
    data: {
      versao: string,
    descEvento: string,
    cOrgaoAutor: string,
    tpAutor: string,
    verAplic?: string,
    }
  ) {
    this.versao = data.versao;
    this.descEvento = data.descEvento;
    this.cOrgaoAutor = data.cOrgaoAutor;
    this.tpAutor = data.tpAutor;
    this.verAplic = data.verAplic ? data.verAplic : undefined;
    this.validateOrThrow();
  }

  private validateOrThrow() {
    if (!this.versao) {
      throw new DomainError('O atributo versao é obrigatório');
    }
    if (!this.descEvento) {
      throw new DomainError('O elemento descEvento é obrigatório');
    }
    if (!this.cOrgaoAutor) {
      throw new DomainError('O elemento cOrgaoAutor é obrigatório');
    }
    if (!this.tpAutor) {
      throw new DomainError('O elemento tpAutor é obrigatório');
    }
    const validTpAutorValues = ['1', '2', '3'];
    if (!validTpAutorValues.includes(this.tpAutor)) {
      throw new DomainError(
        'tpAutor deve ter um dos seguintes valores: 1 - Empresa Emitente; 2 - Empresa Destinatária; 3 - Empresa Transportadora',
      );
    }
  }

  public toJSON() {
    return {
      versao: this.versao,
      descEvento: this.descEvento,
      cOrgaoAutor: this.cOrgaoAutor,
      tpAutor: this.tpAutor,
      verAplic: this.verAplic ? this.verAplic : undefined,
    };
  }
}
