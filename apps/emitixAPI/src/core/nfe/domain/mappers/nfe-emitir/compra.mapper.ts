import type { compraDto } from "src/shared/common/dtos/infNfe/compra/compra.dto";
import { compra } from "../../values-objects/nfe-emitir/compra.vo";

export class CompraMapper {
  static fromDto(dto: compraDto): compra {
    return new compra({
      xNEmp: String(dto.xNEmp),
      xPed: String(dto.xPed),
      xCont: String(dto.xCont)
    })
  }
}