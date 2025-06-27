export class ParserUtils {
  // Função auxiliar para converter valores decimais
  static parseDecimal(value: any): number {
    if (!value) return 0;
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return parseFloat(value) || 0;
    if (value.dec) return parseFloat(value.dec) || 0;
    return 0;
  }

  // Função auxiliar para converter strings
  static parseString(value: any): string {
    if (!value) return '';
    if (typeof value === 'string') return value;
    if (value.text) return value.text;
    return String(value);
  }

  // Função auxiliar para converter valores decimais opcionais
  static parseDecimalOptional(value: any): number | undefined {
    if (!value) return undefined;
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return parseFloat(value) || undefined;
    if (value.dec) return parseFloat(value.dec) || undefined;
    return undefined;
  }

  // Função auxiliar para converter strings opcionais
  static parseStringOptional(value: any): string | undefined {
    if (!value) return undefined;
    if (typeof value === 'string') return value;
    if (value.text) return value.text;
    return String(value);
  }
} 