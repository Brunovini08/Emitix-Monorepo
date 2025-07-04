import { TAtorInteressado } from "src/core/nfe/domain/types/complex_types/TEvento/TAtorInteressado/TAtorInteressado";
import { TAtorInteressadoVO } from "src/core/nfe/domain/values-objects/nfe-evento/evento/infEvento/detEvento/TAtorInteressado.vo";

export class TAtorInteressadoMapper {
    static fromDto(data: TAtorInteressado): TAtorInteressadoVO {
        return new TAtorInteressadoVO({
            cOrgaoAutor: String(data.cOrgaoAutor),
            descEvento: data.descEvento,
            tpAutor: data.tpAutor,
            versao: data.versao,
            verAplic: data.verAplic? data.verAplic : undefined,
        })
    }
}