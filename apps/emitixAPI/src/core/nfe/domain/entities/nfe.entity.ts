import type { AutXML } from "../values-objects/autXML.vo";
import type { Avulsa } from "../values-objects/avulsa.vo";
import type { Dest } from "../values-objects/dest.vo";
import type { Emit } from "../values-objects/emit/emit.vo";
import type { Ide } from "../values-objects/ide.vo";
import type { TLocal } from "../values-objects/tlocal.vo";

export class NFe {
  ide: Ide;
  emit: Emit;
  avulsa?: Avulsa;
  dest?: Dest;
  retirada?: TLocal;
  entrega?: TLocal;
  authXML?: AutXML[];
  det: any[];
  total: any;
  transp: any;
  cobr?: any;
  pag: any;
  infIntermed?: any;
  infAdic?: any;
  exporta?: any;
  compra?: any;
  cana?: any;
  infRespTec?: any;
  infSolicNFF?: any;
  agropecuario?: any;

  private constructor() {}

  public clean() {
    
  }

  public signatureXml() {}

}
