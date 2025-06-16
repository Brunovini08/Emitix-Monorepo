import { IsOptional } from 'class-validator';

export class TSignature {
  @IsOptional()
  signedInfo: string;

  @IsOptional()
  signatureValue: string;

  @IsOptional()
  keyInfo: string;
}
