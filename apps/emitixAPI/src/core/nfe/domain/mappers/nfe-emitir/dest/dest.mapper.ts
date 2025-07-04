import { destDto } from "src/shared/common/dtos/infNfe/det/dest/dest.dto";
import { TDestVO } from "../../../values-objects/nfe-evento/evento/infEvento/detEvento/TEpec/TDest.vo";
import { Dest } from "../../../values-objects/nfe-emitir/dest/dest.vo";
import { EnderecoMapper } from "./endereco.mapper";

export class DestMapper {
  static fromDto(data: destDto): Dest {
    return new Dest({
     xNome: String(data.xNome),
     indIEDest: String(data.indIEDest),
     CNPJ: data.CNPJ ? String(data.CNPJ) : undefined,
     CPF: data.CPF? String(data.CPF) : undefined,
     IE: data.IE? String(data.IE) : undefined,
     email: data.email? String(data.email) : undefined,
     enderDest: data.enderDest? EnderecoMapper.fromDto(data.enderDest) : undefined,
     idEstrangeiro: data.idEstrangeiro? String(data.idEstrangeiro) : undefined,
     IM: data.IM? String(data.IM) : undefined,
     ISUF: data.ISUF? String(data.ISUF) : undefined,
    })
  }
}