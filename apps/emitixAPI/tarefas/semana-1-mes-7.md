# 📆 Tarefa da Semana — 30/06/2025 a 04/07/2025

## ✅ Tarefas

- [X] Criar entidades para envio ao SEFAZ
- [ ] Integrar `pino` para logging estruturado
- [ ] Persistir logs no banco após finalização da emissão
- [ ] Persistir dados do retorno da SEFAZ (XML, protocolo, status)
- [ ] Criar testes unitários para entidades de domínio
- [ ] Criar testes unitários para serviços da camada `application`
- [ ] Terminar a implementação da application e infrastructure das rotas da nfe
- [ ] Criar testes unitários para rotas da nfe
---

## 🔽 Prioridades

🟢 Alta: 1, 2, 3  
🟡 Média: 4  
🔵 Baixa: 5, 6

---

## 📈 Progresso diário

### 🟢 02/07/2025
- [X] Criar entidades para envio ao SEFAZ
- [X] Criado os Mappers para conversão de DTO para Entidade
- [X] Iniciado a integração com o `pino`
- [X] Iniciado a integração com o banco de dados
- [X] Interfaces da repository criadas
- [X] Criado o filtro de erros dentro da camada domain e presentation
- [X] Criado a consulta cadastro na camada application


### 🟢 03/07/2025
- [X] Refatorar a camada de application para melhorar a organização e padronização dos serviços
- [X] Criar interfaces para as applications das rotas
- [X] Refatorar os Mappers de algumas entidades pois a lógica estava incorreta
- [X] Fazer a validação e a filtragem dos erros para o usuário
- [X] Fazer a rota de Emissão funcionar
- [X] Fazer a rota de Consulta funcionar
- [X] Fazer a rota de Consulta de Cadastro funcionar
- [X] Fazer a rota de Consulta de Status funcionar
- [X] Fazer a rota de inutilizar funcionar

### 🟢 04/07/2025

- [] Criar a Entidade do evento
- [] Criar os Mappers do evento
- [] Fazer a rota de evento funcionar
- [] Criar a rota de danfe para gerar o pdf
- [] Estruturar o salvamento das informações das notas no banco
- [] Fazer os métodos de salvamento no banco
- [] Estruturar melhor os logs da aplicação e como serão salvos no banco
- [] Criar testes unitários para as entidades (Talvez hoje)
- [] Criar testes unitários para os usecases (Talvez hoje)
- [] Analisar e ver quais são todas as tags possíveis de serem usadas na NFCE
- [] Criar as entidades da NFCE
- [] Refatorar a camada application da NFCE
- [] Refatorar os builders da NFCE