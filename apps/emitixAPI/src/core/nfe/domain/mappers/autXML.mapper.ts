import { AutXML } from "../values-objects/autXML.vo";

export class AutXMLMapper {
  static fromDto(dto: AutXML): AutXML {
    return new AutXML(dto);
  }
}