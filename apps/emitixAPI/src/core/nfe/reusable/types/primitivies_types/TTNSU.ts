import { IsString, Matches } from "class-validator";

export class TTNSU {
  @IsString()
  @Matches(/^[0-9]{1,15}$/) 
  text!: string;
   
}