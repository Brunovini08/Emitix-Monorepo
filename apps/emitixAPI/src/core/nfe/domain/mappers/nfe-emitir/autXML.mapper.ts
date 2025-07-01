import { autXMLDto } from "src/shared/common/dtos/infNfe/autXML/autXML.dto";
import { AutXML } from "../../values-objects/autXML.vo";

export class AutXMLMapper {
  static fromDto(dto: autXMLDto): AutXML {
    return new AutXML({
      CNPJ: dto.CNPJ ? String(dto.CNPJ) : undefined,
      CPF: dto.CPF ? String(dto.CPF) : undefined,
    });
  }
}