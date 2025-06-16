import { Input, type InputProps } from "@mui/material";
import { green500 } from "../../utils/colors";
import type { InputHTMLAttributes } from "react";
import { green } from "@mui/material/colors";

export function CustomInput(props: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return(
    <Input 
     color={'success'}
      {...props}
    />
  )
}