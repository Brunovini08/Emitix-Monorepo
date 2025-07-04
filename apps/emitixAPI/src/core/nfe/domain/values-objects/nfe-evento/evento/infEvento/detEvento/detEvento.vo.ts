import type { TAtorInteressadoVO } from "./TAtorInteressado.vo";
import type { TCancelamentoVO } from "./TCancelamento.vo";

export class DetEvento {
  TAtorinteressado?: TAtorInteressadoVO;
  TCancelamento?: TCancelamentoVO
  TCartaCorrecao
}