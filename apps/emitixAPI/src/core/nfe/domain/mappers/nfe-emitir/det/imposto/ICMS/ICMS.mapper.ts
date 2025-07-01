import { ICMS } from "src/core/nfe/domain/values-objects/nfe-emitir/det/imposto/ICMS/ICMS.vo";
import { ICMSDto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMS.dto";
import { ICMS00Mapper } from "./ICMS00.mapper";
import { ICMS40Mapper } from "./ICMS40.mapper";
import { ICMS60Mapper } from "./ICMS60.mapper";
import { ICMS90Mapper } from "./ICMS90.mapper";
import { ICMS02Mapper } from "./ICMS02.mapper";
import { ICMS10Mapper } from "./ICMS10.mapper";
import { ICMS15Mapper } from "./ICMS15.mapper";
import { ICMS20Mapper } from "./ICMS20.mapper";
import { ICMS30Mapper } from "./ICMS30.mapper";
import { ICMS51Mapper } from "./ICMS51.mapper";
import { ICMS61Mapper } from "./ICMS61.mapper";
import { ICMS70Mapper } from "./ICMS70.mapper";
import { ICMS53Mapper } from "./ICMS53.mapper";
import { ICMSPartMapper } from "./ICMSPart.mapper";
import { ICMSSN101Mapper } from "./ICMSSN101.mapper";
import { ICMSSN102Mapper } from "./ICMSSN102.mapper";
import { ICMSSN201Mapper } from "./ICMSSN201.mapper";
import { ICMSSN202Mapper } from "./ICMSSN202.mapper";
import { ICMSSN500Mapper } from "./ICMSSN500.mapper";
import { ICMSSN900Mapper } from "./ICMSSN900.mapper";
import { ICMSSTMapper } from "./ICMSST.mapper";

export class ICMSMapper {
  static fromDto(dto: ICMSDto): ICMS {
    let icmsVo: any;
    const mappers = [
      { key: 'ICMS00', mapper: ICMS00Mapper },
      { key: 'ICMS02', mapper: ICMS02Mapper },
      { key: 'ICMS10', mapper: ICMS10Mapper },
      { key: 'ICMS15', mapper: ICMS15Mapper },
      { key: 'ICMS20', mapper: ICMS20Mapper },
      { key: 'ICMS30', mapper: ICMS30Mapper },
      { key: 'ICMS40', mapper: ICMS40Mapper },
      { key: 'ICMS51', mapper: ICMS51Mapper },
      { key: 'ICMS53', mapper: ICMS53Mapper },
      { key: 'ICMS60', mapper: ICMS60Mapper },
      { key: 'ICMS61', mapper: ICMS61Mapper },
      { key: 'ICMS70', mapper: ICMS70Mapper },
      { key: 'ICMS90', mapper: ICMS90Mapper },
      { key: 'ICMSPart', mapper: ICMSPartMapper }, 
      { key: 'ICMSST', mapper: ICMSSTMapper },
      { key: 'ICMSSN101', mapper: ICMSSN101Mapper },
      { key: 'ICMSSN102', mapper: ICMSSN102Mapper },
      { key: 'ICMSSN201', mapper: ICMSSN201Mapper },
      { key: 'ICMSSN202', mapper: ICMSSN202Mapper },
      { key: 'ICMSSN500', mapper: ICMSSN500Mapper },
      { key: 'ICMSSN900', mapper: ICMSSN900Mapper },
    ];

    for (const { key, mapper } of mappers) {
      const dtoKey = key === 'ICMSPart' ? 'ICMSPART' : key;

      if (dto[dtoKey as keyof ICMSDto]) {
        icmsVo = { [key]: (mapper as any).fromDto(dto[dtoKey as keyof ICMSDto]) };
        if (!icmsVo) {
          throw new Error("Não foi possível mapear o DTO para o Value Object ICMS.");
        }
      }
    }
    return new ICMS(icmsVo);
  }
}