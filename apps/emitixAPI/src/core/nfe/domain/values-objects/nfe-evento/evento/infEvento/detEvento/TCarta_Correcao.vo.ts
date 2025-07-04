import { DomainError } from "src/core/nfe/domain/errors/domain.error";

export class TCarta_CorrecaoVO {
  versao: string;
  descEvento: string;
  xCondUso: string;

  constructor(versao: string, descEvento: string, xCondUso: string) {
    this.versao = versao;
    this.descEvento = descEvento;
    this.xCondUso = xCondUso;
    this.validateOrThrow();
  }

  private validateOrThrow() {
    if (!this.versao) {
      throw new DomainError('O atributo versao é obrigatório');
    }
    if (!this.descEvento || !['Carta de Correção', 'Carta de Correcao'].includes(this.descEvento)) {
      throw new DomainError('O elemento descEvento é obrigatório: "Carta de Correção" ou "Carta de Correcao"');
    }
    if (!this.xCondUso) {
      throw new DomainError('O elemento xCondUso é obrigatório');
    }
  }

  public toJSON() {
    return {
      versao: this.versao,
      descEvento: this.descEvento,
      xCondUso: this.xCondUso
    };
  }
}