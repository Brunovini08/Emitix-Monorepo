import { exportaDto } from "src/shared/common/dtos/infNfe/exporta/exporta.dto";
import { exporta } from "../../values-objects/exporta.vo";

export class ExportaMapper {
  static fromDto(dto: exportaDto): exporta {
    return new exporta({
      UFSaidaPais: String(dto.UFSaidaPais),
      xLocExporta: String(dto.xLocExporta),
      xLocDespacho: String(dto.xLocDespacho)
    })
  }
}