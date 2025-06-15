# Desafio de Código: Gerenciador de Tarefas (Angular)
# Relatório Técnico - Gabriel Costa

> **Deploy em produção:**
> A aplicação está publicada no Vercel e pode ser acessada em:
> [https://angular-todo-app-lime-eight.vercel.app/#/todo](https://angular-todo-app-lime-eight.vercel.app/#/todo)

## 1. Visão Geral da Solução

O projeto foi revisado, corrigido e aprimorado para entregar uma aplicação de gerenciamento de tarefas funcional, responsiva e com experiência de usuário moderna. Todos os bugs críticos foram solucionados e as melhorias foram implementadas, incluindo validações, exportação para PDF, filtro de palavras obscenas e uso de SweetAlert2.

---

## 2. Como Executar a Aplicação

1. Clone o repositório para sua máquina local.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie a aplicação:
   ```bash
   npm start
   ```
4. Acesse no navegador: [http://localhost:4200](http://localhost:4200)

---

## 3. Correção dos Erros Iniciais (npm start)

- **Script "start" ausente:** Adicionado ao package.json.
- **Importações e nomes de componentes incorretos:** Corrigidos nomes e imports, como HeaderComponent.
- **Dependências faltantes:** Instaladas dependências como FontAwesome.
- **Erros de injeção de serviço:** Corrigida importação do TodoService.
- **Outros erros de build:** Ajustados conforme mensagens do Angular.

---

## 4. Relatório de Correção de Bugs

- **Duplicação de tarefas ao salvar:** Removida chamada duplicada no método addTask.
- **Só salva uma vez sem atualizar:** Removido controle de count e ajustada lógica.
- **Botão de limpar todas as tarefas em inglês:** Corrigido para português.
- **Botão de exibir/ocultar tarefas concluídas invertido:** Corrigida lógica e texto.
- **Limpar concluídas sem confirmação:** Adicionada confirmação com SweetAlert2.
- **Limpar concluídas removia não concluídas:** Corrigida lógica do filtro.
- **Editar não funcional:** Implementada edição com preenchimento do campo e atualização.
- **Editar desalinhado/remover sem destaque:** Ajustado CSS, botões lado a lado e cor vermelha para remover.
- **Lista sem rolagem:** Adicionado overflow-y: auto.


---

## 5. Relatório de Implementação de Melhorias

- **Ordenar de A a Z:** Botão implementado, ordena lista visível.
- **Adicionar tarefa com Enter:** Implementado evento no input.
- **Salvar tarefa em branco ou só espaços:** Adicionada validação e mensagem de erro.
- **Salvar tarefa com menos de 10 caracteres:** Adicionada validação e mensagem de erro.
- **Adicionar múltiplas tarefas com |:** Implementado split e validação individual.
- **Filtro de palavras obscenas:** Usada biblioteca `bad-words`.
- **Exportar para PDF:** Usada biblioteca `jsPDF`.
- **SweetAlert2:** Substituiu todos os alerts/confirms nativos.

---

## 6. Relatório de Débito Técnico

- [x] Testes automatizados não foram incluídos por limitação de tempo.

---

## 7. Relatório de Melhorias

- Implementar autenticação de usuário.
- Melhorar acessibilidade e responsividade.
- Adicionar testes automatizados com Playwright.

---

## 8. Decisões e Considerações

- Optei por priorizar a experiência do usuário, usando SweetAlert2 para todas as confirmações.
- O filtro de palavras obscenas pode ser customizado para o português, se necessário.
- O código foi modularizado para facilitar manutenção e evolução futura.

---

## Observações de Uso

- O comportamento atual já permite adicionar múltiplas tarefas separadas pelo pipe "|", mas cada título precisa ter no mínimo 10 caracteres. Se todos os títulos forem menores que 10 caracteres, a mensagem de erro aparecerá listando os inválidos.
- Exemplo: Se digitar `Tarefa válida 1 | teste 1`, apenas "teste 1" será listado como inválido, e nenhuma tarefa será adicionada até que todos os títulos estejam válidos.
- Ao usar a biblioteca SweetAlert2, se tentar adicionar uma tarefa com palavrão (ex: `tarefa com palavrão fuck`), será exibida a mensagem: "Não é permitido cadastrar tarefas com palavras obscenas."