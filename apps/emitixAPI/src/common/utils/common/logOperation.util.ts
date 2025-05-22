export function logOperation(cnpj, clientId, action, details) {
  const logMessage = `${new Date().toISOString()} | CNPJ: ${cnpj} | SoftwareHouse: ${clientId} | Action: ${action} | Details: ${details}\n`;
  return logMessage;
}
