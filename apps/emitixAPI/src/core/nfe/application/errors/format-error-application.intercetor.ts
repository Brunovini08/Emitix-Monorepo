
export class FormatErrorApplicationInterceptor {
    static formatXsdErrors(messages: string[]): { location: string; error: string }[] {
        return messages.map((line) => {
            const cleaned = line
                .replace(/^\[error\]\s*/, '')     // remove "[error] " do começo
                .replace(/\(.*?\)$/, '')          // remove "(1:xxx)" do fim
                .trim();

            // Tenta extrair o nome do elemento do erro, se possível
            const match = cleaned.match(/element ['"]?([^'"\s]+)['"]?/i);
            const location = match ? match[1] : 'desconhecido';

            return {
                location,
                error: cleaned,
            };
        });
    }

}
