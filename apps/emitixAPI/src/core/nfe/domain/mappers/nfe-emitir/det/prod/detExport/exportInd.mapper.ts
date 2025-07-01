import { ExportInd } from "src/core/nfe/domain/values-objects/det/prod/detExport/exportInd.vo";
import { exportIndDto } from "src/shared/common/dtos/infNfe/det/prod/detExport/exportInd/exportIndDto";

export class ExportIndMapper {
  static fromDto(dto: exportIndDto): ExportInd {
    return new ExportInd({
      nRE: dto.nRE,
      chNFe: String(dto.chNFe),
      qExport: Number(dto.qExport),
    });
  }
}