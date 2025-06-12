# Relatório Técnico - [Samuel Gomes Vieira]

## Visão Geral da Solução
Este projeto consiste em uma aplicação Angular para gerenciamento de tarefas (Todo List) com funcionalidades completas, incluindo criação, edição, remoção, filtragem e exportação das tarefas com dados mockados. Durante o desenvolvimento, foram realizadas correções de bugs iniciais, aprimoramentos na usabilidade e implementação de melhorias técnicas utilizando bibliotecas como bad-words, jsPDF e SweetAlert2 para otimizar a experiência do usuário.e experiência do usuário.

## ⚙️ Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- Git
- Node.js **v14.2.0** (use o NVM para instalar)
- Angular CLI **v16.2.12**
- Yarn (Necessário para instalar dependências do projeto)

## 🚀 Instalação e Setup

### 1. Fork e Clone

```bash
# Faça o fork deste repositório no GitHub
# Depois, clone o seu fork:
git clone https://github.com/seu-usuario/seu-fork-do-projeto.git
cd seu-fork-do-projeto
```

### 2. Configuração de Ambiente

#### 🔧 Versões

- **Node.js:** v14.2.0
- **Angular CLI:** v16.2.12

#### 🛠️ Como instalar as versões corretas

- Instale o [NVM para Windows](https://github.com/coreybutler/nvm-windows/releases)
- Instale a versão correta do Node:

```bash
nvm install 14.2.0
nvm use 14.2.0
```

- Instale o Angular CLI:

```bash
npm install -g @angular/cli@16.2.12
```

- Instale dependências:

```bash
npm install
# ou
yarn install
```

## ▶️ Erros que impedem de iniciar o projeto

1° - Erro: 'HeaderComponent' (imported as 'HeaderComponent') was not found

Causa: nomenclatura errada da importação HeaderComponent
Solução: localize a pasta no seguinte caminho: `src\app\layout\header\header.component.ts` altere a classe que estava sendo exportada com o nome “HeadeComponent” e importada com o nome “HeaderComponent”

Segundo lugar para ajustar: corrigir o erro de digitação em `export class HeadeComponent implements OnInit` localizado no arquivo header.component.ts no caminho: teste-trainee-dev\src\app\layout\header\header.component.ts

```
2° - Erro de importação do TodoService.

Causa: Não tem a importação do arquivo no incio do arquivo.
Solução: no arquivo new-task.component.ts localizado em src/app/shared/services/, faça a importação do arquivo import { TodoService } from 'src/app/shared/services/todo.service


3° - Error: Cannot find module '@babel/compat-data/plugins.js'

Causa: faltando o modulo do pacote babel no package.json
Solução: no terminal coloque o comando -> npm install --save-dev @babel/compat-data


4° Can't resolve 'node_modules/@fortawesome/fontawesome-free/css/all.min.css'

Causa: faltando o modulo do pacote fontawesome-free/css/all.min.css no package.json
Solução: rode o comando -> npm install @fortawesome/fontawesome-free



## ▶️ Executando o Projeto

```bash
ng serve
```

Verifique se o `package.json` contém:

```json
"scripts": {
  "start": "ng serve"
}
```

## 🐞 Correções de Bugs

### 1. Duplicação de tarefas ao clicar em "Salvar"

- Arquivo: `new-task.component.ts`
- Solução: Remoção da linha duplicada `this.todoService.addTodo(newTodo);`

### 2. Só é possível adicionar tarefa uma vez

- Arquivo: `new-task.component.ts`
- Solução: Comentadas variáveis `count = 0;`, `if (this.count > 0) return;` e `this.count++`.

### 3. Texto do botão "Clear All" em inglês

- Arquivo: `todo.component.html`
- Solução: Tradução do botão para **"Limpar Todas as Tarefas"**

### 4/5. Comportamento invertido nos botões de exibir/ocultar tarefas concluídas

- Arquivo: `todo.component.html`
- Solução: Corrigido texto condicional.

### 6. Falta de confirmação ao limpar tarefas concluídas

- Arquivo: `todo.component.ts`
- Solução: Adicionada confirmação com `confirm(...)` (posteriormente substituída por SweetAlert).

### 7. Botão "Limpar Tarefas Concluídas" removia tarefas não concluídas

- Arquivo: `todo.service.ts`
- Solução: Criada função para filtrar tarefas não concluídas.

### 8. Botão “Editar” não funcional

- Arquivos: `todo-item.component.ts`, `todo-item.component.html`, `todo.component.html`, `todo-item.component.css`
- Solução: Criação do modal de edição, lógica de salvamento e atualização do item.

### 11. Estilo e alinhamento dos botões "Editar" e "Remover"

- Arquivo: `todo-item.component.css`
- Solução: Aplicado estilo com `flex`, cores e espaçamento.

### 12/13. Permitir salvar tarefas em branco

- Arquivo: `new-task.component.ts`
- Solução: Adicionada validação `if (!this.newTaskTitle.trim()) return;`

## ✨ Funcionalidades Extras Implementadas

- ✅ Adição via tecla Enter
- 🔠 Ordenação de tarefas (A-Z)
- 🚫 Filtro de palavras ofensivas (bad-words)
- 📄 Exportar tarefas para PDF (jsPDF)
- 🎉 SweetAlert para alertas modernos


## Funcionalidades Implementadas

### 🔤 Ordenação de Tarefas de A a Z
Adiciona um botão que, ao ser clicado, ordena as tarefas pelo título em ordem alfabética.
- **Arquivo:** `todo.component.ts`
- **Método:** `sortTodosAZ()`
- **Interface:** Botão com `(click)="sortTodosAZ()"`

### ⌨️ Adicionar Tarefa com Tecla Enter
Permite que o usuário adicione uma tarefa pressionando **Enter** no campo de texto.
- **Arquivo:** `new-task.component.html`
- **Ação:** `(keydown.enter)="addTask()"` no input

### 🚫 Filtro de Palavras Inadequadas
Utiliza a biblioteca `bad-words` para censurar palavras indesejadas nos títulos das tarefas.
- **Instalação:** `yarn add bad-words`
- **Arquivo:** `new-task.component.ts`
- **Filtro customizado:** Adição e remoção de palavras específicas

### 📄 Exportar Tarefas em PDF
Gera um PDF com a lista de tarefas e seus status (concluída ou não).
- **Biblioteca:** `jsPDF`
- **Arquivo:** `todo.component.ts`
- **Método:** `exportToPDF()`

### ⚠️ Substituição de Alertas Nativos por SweetAlert2
Melhoria na experiência do usuário com alertas visuais personalizados.
- **Instalação:** `npm install sweetalert2`
- **Arquivo:** `todo.component.ts`
- **Alertas personalizados:** `clearAll()` e `clearCompletedTasks()` usam `Swal.fire()`


##  **Relatório de Débito Técnico:**

Não obtive exito em relação a limpar o texto preenchido após editar, pois a função editar foi bem complicada para fazer, foi a parte que eu senti um pouco mais de dificuldade e demorei mais.

## **Relatório de Melhorias:**

Implementar horário/data para cada tarefa e quando estiver perto da data ou horário avisar para o usuário que vai expirar o prazo da tarefa.

Adicionar integração com banco de dados ao invés de utilizar local storage, para caso a aplicação se torne mais escalavel e robusta.


## **Decisões e Considerações:**
Minha maior dificuldade foi em entender o funcionamento da função Editar, pois se tratava de um framework que utilizei muito pouco, então tive que ver documentação e até pedir ajuda amigos.

O projeto realmente é um baita de um desafio, fiquei muito empolgado fazendo e corrigindo o projeto.
