import { DestMapper } from "src/core/nfe/domain/mappers/nfe-emitir/dest/dest.mapper";
import { TEpec } from "src/core/nfe/domain/types/complex_types/TEvento/TEpec/TEpec";
import { TEpecVO } from "src/core/nfe/domain/values-objects/nfe-evento/evento/infEvento/detEvento/TEpec/TEpec.vo";

export class TEpecMapper {
    static fromDto(data: TEpec): TEpecVO {
        return new TEpecVO({
            cOrgaoAutor: data.cOrgaoAutor,
            descEvento: data.descEvento,
            dhEmi: String(data.dhEmi),
            dest: DestMapper.fromDto(data.dest),
            IE: data.IE,
            tpAutor: data.tpAutor,
            tpNF: data.tpNF,
            versao: data.versao,
            verAplic: data.verAplic,
        })
    }
}