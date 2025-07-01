import type { detExportDto } from "src/shared/common/dtos/infNfe/det/prod/detExport/detExport.dto";
import { ExportIndMapper } from "./exportInd.mapper";
import { DetExport } from "src/core/nfe/domain/values-objects/det/prod/detExport/detExport.vo";

export class DetExportMapper {
  static fromDto(dto: detExportDto): DetExport {
    return new DetExport({
      exportInd: dto.exportInd?.map((exportInd) => ExportIndMapper.fromDto(exportInd)) || [],
      nDraw: dto.nDraw ? String(dto.nDraw) : undefined,
    })
  }
}