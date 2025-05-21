import { BadRequestException } from '@nestjs/common';
import { TCnpj } from '../../types/primitivies_types/TCnpj';
import { TCodUfIBGE } from '../../types/primitivies_types/TCodUfIBGE';
import type { TDateTimeUTC } from '../../types/primitivies_types/TDateTimeUTC';
import { TMod } from '../../types/primitivies_types/TMod';
import { TNF } from '../../types/primitivies_types/TNF';
import { TSerie } from '../../types/primitivies_types/TSerie';
import type { TString } from '../../types/primitivies_types/TString';
import type { TUf } from '../../types/primitivies_types/TUf';
import { calculateVerificadorDigite } from './calculateVerificatorDigite.util';

export function generateAccessKey(
  cUF: TCodUfIBGE,
  cnpj: TCnpj,
  modelo: TMod,
  serie: TSerie,
  nNF: TNF,
  cNF: string,
  tpEmis: string,
  dhEmi: TDateTimeUTC
) {

  const emissionDate = new Date(String(dhEmi));
  const AAMM =
    emissionDate.getFullYear().toString().slice(-2) +
    (emissionDate.getMonth() + 1).toString().padStart(2, '0');

  const nNFFormat = String(nNF).padStart(9, '0')

  const chaveParcial = cUF + AAMM + cnpj + modelo + serie + nNFFormat + tpEmis + cNF;
  const cDV = calculateVerificadorDigite(chaveParcial);
  const chave = chaveParcial + cDV;

  return { chave, cDV };
}

export function generateAccessKeyToInutNfe(
  cUF: TUf,
  cnpj: TCnpj,
  ano: string,
  mod: TMod,
  serie: TSerie,
  nNFIni: TString,
  nNFFin: TString,
): string {
  if (!cUF || !cnpj || !ano || !mod || !serie || !nNFIni || !nNFFin) {
    throw new Error('Todos os campos são obrigatórios');
  }

  try {
    const serieFormatada = serie.toString().padStart(3, '0');
    const nNFIniFormatado = nNFIni.toString().padStart(9, '0');
    const nNFFinFormatado = nNFFin.toString().padStart(9, '0');

    const numericPart = `${cUF}${ano}${cnpj}${mod}${serieFormatada}${nNFIniFormatado}${nNFFinFormatado}`;

    if (numericPart.length !== 41) {
      throw new Error(`Parte numérica inválida: "${numericPart}" (${numericPart.length} caracteres)`);
    }

    const chave = `ID${numericPart}`;
    return chave;
  } catch (error) {
    console.error(error)
    throw new Error('Erro ao gerar a chave de acesso');
  }
}

export function generateAccessKeyToEvent(tpEvento, nfeKey, nSeqEvento) {
  if(!tpEvento ||!nfeKey ||!nSeqEvento) {
    throw new BadRequestException('Todos os campos são obrigatórios');
  }
  const tpEventoFormatado = tpEvento.toString().padStart(6, '0');
  const nSeqEventoFormatado = nSeqEvento.toString().padStart(2, '0');
  const chave = `ID${tpEventoFormatado}${nfeKey}${nSeqEventoFormatado}`;
  return chave;
}