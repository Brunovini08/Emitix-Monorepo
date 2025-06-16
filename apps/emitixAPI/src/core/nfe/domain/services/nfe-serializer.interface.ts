import { NFe } from "../entities/nfe.entity";

export interface INFeSerializer {
  serialize(nfe: NFe): string
}