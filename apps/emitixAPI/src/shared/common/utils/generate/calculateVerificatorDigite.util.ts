export function calculateVerificadorDigite(chave: string): string {
  if (chave.length > 43) throw new Error(`A chave de acesso tem ${chave.length} mas deveria ter 43 caracteres`)
  try {
    let peso = 2;
    let soma = 0;

    // Percorre da direita para a esquerda
    for (let i = chave.length - 1; i >= 0; i--) {
      soma += Number(chave[i]) * peso;
      peso = peso < 9 ? peso + 1 : 2;
    }

    const resto = soma % 11;
    const digito = (resto === 0 || resto === 1) ? 0 : 11 - resto;
    return digito.toString();
  } catch (error) {
    return String(error)
  }
}
