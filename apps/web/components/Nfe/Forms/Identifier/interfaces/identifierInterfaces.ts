import { z } from "zod"


const ide = z.object({
  cUF: z.string(),
  natOp: z.string().length(60),
  mod: z.enum(["55", "65"]),
  serie: z.string().length(999),
  nNF: z.string(),
  dhEmi: z.date(),
  dhSaiEnt: z.date().optional(),
  tpNF: z.enum(["0", "1"]),
  idDest: z.enum(["1", "2", "3"]),
  cMunFG: z.string(),
  tpImp: z.enum(["0", "1", "2", "3", "4", "5",]),
  tpEmis: z.enum(["1", "2", "3", "4", "5", "6", "7", "9"]),
  tpAmb: z.enum(["1", "2"]),
  finNFe: z.enum(["1", "2", "3", "4"]),
  indFinal: z.enum(["0", "1"]),
  indPres: z.enum(["0", "1", "2", "3", "4", "5", "9"]),
  indIntermed: z.enum(["0", "1"]),
  procEmi: z.enum(["0", "1", "2", "3"]),
  verProc: z.string().length(20),
   
})