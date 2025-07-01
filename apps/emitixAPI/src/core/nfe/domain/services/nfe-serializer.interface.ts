import { NFe } from "../entities/nfe-emitir.entity";

export interface INFeSerializer {
  serialize(nfe: NFe): string
}