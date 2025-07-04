import { DomainError } from "src/core/nfe/domain/errors/domain.error";
import type { TAtorInteressadoVO } from "./TAtorInteressado.vo";
import type { TCancelamentoVO } from "./TCancelamento.vo";
import { TCarta_CorrecaoVO } from "./TCarta_Correcao.vo";
import { TEpecVO } from "./TEpec/TEpec.vo";
import { TMani_DestVO } from "./TMani_Dest.vo";
import { TPedido_ProrrogVO } from "./TPedido_Prorrog/TPedido_Prorrog.vo";

export class DetEvento {
  TAtorinteressado?: TAtorInteressadoVO | undefined;
  TCancelamento?: TCancelamentoVO | undefined;
  TCartaCorrecao?: TCarta_CorrecaoVO | undefined;
  TEpec?: TEpecVO | undefined;
  TMani_Dest?: TMani_DestVO | undefined;
  TPedido_Prorrog?: TPedido_ProrrogVO | undefined;

  constructor(data: {
    TAtorinteressado?: TAtorInteressadoVO;
    TCancelamento?: TCancelamentoVO
    TCartaCorrecao?: TCarta_CorrecaoVO
    TEpec?: TEpecVO
    TMani_Dest?: TMani_DestVO
    TPedido_Prorrog?: TPedido_ProrrogVO
  }) {
    this.TAtorinteressado = data.TAtorinteressado || undefined
    this.TCancelamento = data.TCancelamento || undefined
    this.TCartaCorrecao = data.TCartaCorrecao || undefined
    this.TEpec = data.TEpec || undefined
    this.TMani_Dest = data.TMani_Dest || undefined
    this.TPedido_Prorrog = data.TPedido_Prorrog || undefined
    this.validateOrThrow()
  }

  private validateOrThrow() {
    if(!this.TAtorinteressado && !this.TCancelamento && !this.TCartaCorrecao && !this.TEpec && !this.TMani_Dest && !this.TPedido_Prorrog) {
      throw new DomainError('DetEvento deve ter pelo menos um valor: AtorInteressado, Cancelamento, CartaCorrecao, Epec, Mani_Dest, Pedido_Prorrog')
    }
    if(this.TAtorinteressado && this.TCancelamento) {
      throw new DomainError('DetEvento não pode ter mais de um valor: AtorInteressado, Cancelamento')
    }
    if(this.TAtorinteressado && this.TCartaCorrecao) {
      throw new DomainError('DetEvento não pode ter mais de um valor: AtorInteressado, CartaCorrecao')
    }
    if(this.TAtorinteressado && this.TEpec) {
      throw new DomainError('DetEvento não pode ter mais de um valor: AtorInteressado, Epec')
    }
    if(this.TAtorinteressado && this.TMani_Dest) {
      throw new DomainError('DetEvento não pode ter mais de um valor: AtorInteressado, Mani_Dest')
    }
    if(this.TAtorinteressado && this.TPedido_Prorrog) {
      throw new DomainError('DetEvento não pode ter mais de um valor: AtorInteressado, Pedido_Prorrog')
    }
    if(this.TCancelamento && this.TCartaCorrecao) {
      throw new DomainError('DetEvento não pode ter mais de um valor: Cancelamento, CartaCorrecao')
    }
    if(this.TCancelamento && this.TEpec) {
      throw new DomainError('DetEvento não pode ter mais de um valor: Cancelamento, Epec')
    }
    if(this.TCancelamento && this.TMani_Dest) {
      throw new DomainError('DetEvento não pode ter mais de um valor: Cancelamento, Mani_Dest')
    }
    if(this.TCancelamento && this.TPedido_Prorrog) {
      throw new DomainError('DetEvento não pode ter mais de um valor: Cancelamento, Pedido_Prorrog')
    }
    if(this.TCartaCorrecao && this.TEpec) {
      throw new DomainError('DetEvento não pode ter mais de um valor: CartaCorrecao, Epec')
    }
    if(this.TCartaCorrecao && this.TMani_Dest) {
      throw new DomainError('DetEvento não pode ter mais de um valor: CartaCorrecao, Mani_Dest')
    }
    if(this.TCartaCorrecao && this.TPedido_Prorrog) {
      throw new DomainError('DetEvento não pode ter mais de um valor: CartaCorrecao, Pedido_Prorrog')
    }
    if(this.TEpec && this.TMani_Dest) {
      throw new DomainError('DetEvento não pode ter mais de um valor: Epec, Mani_Dest')
    }
    if(this.TEpec && this.TPedido_Prorrog) {
      throw new DomainError('DetEvento não pode ter mais de um valor: Epec, Pedido_Prorrog')
    } 
    if(this.TMani_Dest && this.TPedido_Prorrog) {
      throw new DomainError('DetEvento não pode ter mais de um valor: Mani_Dest, Pedido_Prorrog')
    }
  }

  public toJSON() {
    return {
      TAtorinteressado: this.TAtorinteressado? this.TAtorinteressado.toJSON() : undefined,
      TCancelamento: this.TCancelamento? this.TCancelamento.toJSON() : undefined,
      TCartaCorrecao: this.TCartaCorrecao? this.TCartaCorrecao.toJSON() : undefined,
      TEpec: this.TEpec? this.TEpec.toJSON() : undefined,
      TMani_Dest: this.TMani_Dest? this.TMani_Dest.toJSON() : undefined,
      TPedido_Prorrog: this.TPedido_Prorrog? this.TPedido_Prorrog.toJSON() : undefined
    }
  }
}