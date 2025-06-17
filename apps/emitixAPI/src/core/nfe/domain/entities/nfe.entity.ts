import type { AutXML } from "../values-objects/autXML.vo";
import type { Avulsa } from "../values-objects/avulsa.vo";
import type { cana } from "../values-objects/cana/cana.vo";
import type { cobr } from "../values-objects/cobr/cobr.vo";
import type { compra } from "../values-objects/compra.vo";
import type { Dest } from "../values-objects/dest.vo";
import type { Det } from "../values-objects/det/det.vo";
import type { Emit } from "../values-objects/emit/emit.vo";
import type { exporta } from "../values-objects/exporta.vo";
import type { Ide } from "../values-objects/ide.vo";
import type { infAdic } from "../values-objects/infAdic/infAdic.vo";
import type { infIntermed } from "../values-objects/infIntermed.vo";
import type { infRespTec } from "../values-objects/infRespecTec/infRespTec.vo";
import type { pag } from "../values-objects/pag/pag.vo";
import type { TLocal } from "../values-objects/tlocal.vo";
import type { Total } from "../values-objects/total/total.vo";
import type { transp } from "../values-objects/Transp/transp.vo";
import type { infSolicNFF } from "../values-objects/infSolicNFF.vo";
import type { agropecuario } from "../values-objects/agropecuario/agropecuario.vo";

export class NFe {
  ide: Ide;
  emit: Emit;
  avulsa?: Avulsa;
  dest?: Dest;
  retirada?: TLocal;
  entrega?: TLocal;
  authXML?: AutXML[];
  det: Det[];
  total: Total;
  transp: transp;
  cobr?: cobr;
  pag: pag;
  infIntermed?: infIntermed;
  infAdic?: infAdic;
  exporta?: exporta;
  compra?: compra;
  cana?: cana;
  infRespTec?: infRespTec;
  infSolicNFF?: infSolicNFF;
  agropecuario?: agropecuario;

  constructor(data: NFe) {
    this.ide = data.ide;
    this.emit = data.emit;
    this.avulsa = data.avulsa;
    this.dest = data.dest;
    this.retirada = data.retirada;
    this.entrega = data.entrega;
    this.authXML = data.authXML;
    this.det = data.det;
    this.total = data.total;
    this.transp = data.transp;
    this.cobr = data.cobr;
    this.pag = data.pag;
    this.infIntermed = data.infIntermed;
    this.infAdic = data.infAdic;
    this.exporta = data.exporta;
    this.compra = data.compra;
    this.cana = data.cana;
    this.infRespTec = data.infRespTec;
    this.infSolicNFF = data.infSolicNFF;
    this.agropecuario = data.agropecuario;
  }

  public clean() {
    
  }

  public signatureXml() {}

}
