import { SigninFormSchema, type FormState } from "../lib/definitions";

export async function signin(state: FormState, formData: FormData) {
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedFields.data),
      credentials: 'include',
    });

    const res = await response.json();

    if (!response.ok) {
      return {
        success: false,
        errors: typeof res.error === 'string' ? [{ message: res?.error?.message }] : res?.error,
      };
    }

    return {
      success: true,
      user: res,
    };
  } catch (error) {
    return {
      success: false,
      errors: [{ message: 'Erro de rede ou servidor fora do ar.' }],
    };
  }
}
