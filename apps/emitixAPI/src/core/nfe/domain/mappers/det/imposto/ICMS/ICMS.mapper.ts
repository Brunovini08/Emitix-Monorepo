import type { ICMS } from "src/core/nfe/domain/values-objects/det/imposto/ICMS/ICMS.vo";
import type { ICMSDto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMS.dto";

export class ICMSMapper {
  static fromDto(dto: ICMSDto): ICMS {
    return new ICMS({
      ICMS00: ICMS00Mapper.fromDto(dto.ICMS00),
      ICMS40: ICMS40Mapper.fromDto(dto.ICMS40),
      ICMS60: ICMS60Mapper.fromDto(dto.ICMS60),
      ICMS90: ICMS90Mapper.fromDto(dto.ICMS90),
      ICMS02: ICMS02Mapper.fromDto(dto.ICMS02),
      ICMS10: ICMS10Mapper.fromDto(dto.ICMS10),
      ICMS15: ICMS15Mapper.fromDto(dto.ICMS15),
      ICMS20: ICMS20Mapper.fromDto(dto.ICMS20),
      ICMS30: ICMS30Mapper.fromDto(dto.ICMS30),
      ICMS51: ICMS51Mapper.fromDto(dto.ICMS51),
      ICMS61: ICMS61Mapper.fromDto(dto.ICMS61),
      ICMS70: ICMS70Mapper.fromDto(dto.ICMS70),
      ICMS53: ICMS53Mapper.fromDto(dto.ICMS53),
      ICMSPart: ICMSPartMapper.fromDto(dto.ICMSPART),
      ICMSSN101: ICMSSN101Mapper.fromDto(dto.ICMSSN101),
      ICMSSN102: ICMSSN102Mapper.fromDto(dto.ICMSSN102),
      ICMSSN201: ICMSSN201Mapper.fromDto(dto.ICMSSN201),
      ICMSSN202: ICMSSN202Mapper.fromDto(dto.ICMSSN202),
      ICMSSN500: ICMSSN500Mapper.fromDto(dto.ICMSSN500),
      ICMSSN900: ICMSSN900Mapper.fromDto(dto.ICMSSN900),
      ICMSST: ICMSSTMapper.fromDto(dto.ICMSST),
    });
  }
}