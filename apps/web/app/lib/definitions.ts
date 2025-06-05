import { z } from 'zod'
 
export const SigninFormSchema = z.object({
  email: z.string().email({ message: 'Por favor, coloque o seu email.' }).trim(),
  password: z
    .string()
    .min(6, { message: 'Por favor, sua senha deve ter no mínimo 6 caracters'})
    .trim(),
})
 
export type FormState =
  | {
      errors?: []
      message?: string,
      success?: boolean,
      user: any
    }
  | undefined

