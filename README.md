# Relatório Técnico - Letícia Bezerra

---

### 1. Visão Geral da Solução

- O projeto foi clonado, configurado e analisado conforme solicitado.
- Foram realizadas correções iniciais para garantir que a aplicação pudesse ser executada localmente, incluindo ajustes em componentes e dependências.

→ Inicia corretamente (**`npm start`**).

---

### 2. Como Executar a Aplicação

Para rodar o projeto localmente, siga os seguintes passos:

```bash
git clone [URL_DO_REPOSITÓRIO]
cd teste-trainee-dev
npm install
npm start
```

---

### 3. Correção dos Erros Iniciais (npm start)

Ao executar o comando `npm start`, a aplicação inicialmente não compilava. Os seguintes problemas foram identificados e corrigidos:

### ➤ Erro 1: Nome incorreto do componente exportado

- **Erro:** `export 'HeaderComponent' was not found... (possible exports: HeadeComponent)`
- **Causa:** O nome da classe estava digitado incorretamente como `HeadeComponent` (faltando o "r").
- **Correção:** Corrigi o nome da classe no arquivo `header.component.ts`:
    
    ```tsx
    export class HeaderComponent implements OnInit { ... 
    ```
    

---

### 4. Correção do Import do Serviço TodoService

Durante a análise, foi identificado que o componente `NewTaskComponent` não possuía a importação do serviço `TodoService`, causando erro de compilação na injeção de dependência no construtor.

- **Causa:** Ausência da importação do serviço no arquivo `new-task.component.ts`.
- **Correção:** Adicionei a importação do `TodoService` com o caminho relativo correto, conforme a organização das pastas do projeto:
    
    ```tsx
    import { TodoService } from '../../shared/services/todo.service';
    ```
    

---

### 5. Aplicação compilada e executada corretamente

Após as correções aplicadas — incluindo o ajuste do nome do componente `HeaderComponent`, a importação correta do serviço `TodoService` e a instalação da dependência do `@fortawesome/fontawesome-free` — a aplicação compilou e executou corretamente.

Ao executar o comando `npm start`, o Angular Live Development Server iniciou com sucesso, sem apresentar erros, e a aplicação está disponível localmente no endereço:

➡️ http://localhost:4200/

---

### → Decidi criar Branchs diferentes para cada tipo de tarefa a ser realizada, para organizar os tipos de cada solução.

---

## **Melhorias a Implementar**

### → Branch - fix/ui-validations

### 1.  **(5.1. Bugs a Corrigir - Item 3)** O texto do botão de limpar todas as tarefas não está em português.

- Botão “Limpar Tudo”:
    
    No arquivo `todo.component.html`
    → Alterado de:
    
    ```tsx
    <button (click)="clearAll()" [innerHTML]="labelClearAll"></button>
    ```
    
    → Para:
    
    ```tsx
    <button (click)="clearAll()">Limpar Tudo</button>
    ```
    
- (MELHORIA)Texto de confirmação:
    
    No arquivo `todo.component.ts`
    → Alterado de:
    
    ```tsx
    confirm('Are you sure you want to clear all tasks')
    ```
    
    → Para:
    
    ```tsx
    confirm('Você tem certeza de que deseja limpar todas as tarefas?')
    ```
    

### 2. **(5.1. Bugs a Corrigir - Item 10)** O botão “Remover” deve ter a cor vermelha para indicar uma ação destrutiva.

- No arquivo `todo-item.component.html` 
-> Mudei disso:
    
    ```tsx
    <button class="todo-item_delete" style="color: black" (click)="deleteTodo()">
    ```
    
    → Para isso:
    
    ```tsx
    <button class="todo-item_delete" style="color: red" (click)="deleteTodo()">
    ```
    

### 3. **(5.1. Bugs a Corrigir - Item 9)** O botão “Editar” está desalinhado e deve ser posicionado ao lado do botão “Remover”.

- No arquivo `todo-item.component.html`
    
    → O botão **Editar**, que antes estava solto no layout, foi agrupado com o botão **Remover** dentro de uma `div` para alinhamento horizontal consistente:
    
    ```html
    <div class="todo-item_actions">
      <button class="todo-item_edit">
        <i class="fas fa-edit fa-lg"></i> Editar
      </button>
      <button class="todo-item_delete" style="color: red" (click)="deleteTodo()">
        <i class="fas fa-trash-alt fa-lg"></i> Remover
      </button>
    </div>
    ```
    
- No arquivo  `todo-item.component.css`
    
    → Foi adicionada a classe `.todo-item_actions` para garantir o alinhamento lateral adequado entre os botões:
    
    ```css
    .todo-item_actions {
      display: flex;
      gap: 0.5rem
    }
    ```
    

### 4. **(5.1. Bugs a Corrigir - Item 11)** A lista de tarefas não apresenta uma barra de rolagem quando o número de itens ultrapassa a altura do painel, impedindo a visualização de todas as tarefas

- **Problema:** Quando a quantidade de tarefas adicionadas excedia o espaço vertical da área visível do painel, os itens ultrapassavam o limite inferior do contêiner `.todo-list_container` e **não era possível visualizá-los ou interagir com eles**.
- **Causa:** O estilo do componente definia `overflow-y: hidden;`, o que oculta qualquer conteúdo que ultrapasse a altura especificada do contêiner (`60vh`)
- No arquivo `todo-item.component.css`
    
    → Mudei disso:
    
    ```css
    .todo-list_container {
      ...
      overflow-y: hidden;
    }
    ```
    
    → Para isso:
    
    ```css
    .todo-list_container {
      ...
      overflow-y: auto;
    }
    ```
    

### 5.  (Melhoria)Texto da confirmação ao deletar tarefa não está em português.

Essa alteração melhora a consistência da interface com o idioma da aplicação e a acessibilidade para o usuário.

- No arquivo `todo-item.component.ts`
    
    → Mudei disso:
    
    ```tsx
    confirm('Are you sure you want to delete this task?')
    ```
    
    → Para isso:
    
    ```tsx
    confirm('Você tem certeza de que deseja deletar essa atividade?')
    ```
    

### 6.  **(5.1. Bugs a Corrigir - Item 12)**Salvar sem digitar um “Título da Tarefa” está adicionando um item em branco à lista e **(5.1. Bugs a Corrigir - Item 13)**Digitar apenas espaços no campo “Título da Tarefa” e salvar também está adicionando um item em branco.

- No arquivo `new-task.component.ts` , foi adicionada a seguinte validação no método `addTask()`:
    
    ```tsx
    addTask() {
      if (this.count > 0) return;
    
      if (!this.newTaskTitle || !this.newTaskTitle.trim()) {
        return;
      }
    
      const newTodo: Todo = {
        id: this.todoService.getTodoNewId(),
        title: this.newTaskTitle.trim(),
        completed: false
      };
    
      this.todoService.addTodo(newTodo);
      this.newTaskTitle = '';
    }
    ```
    
    ### **Explicação técnica:**
    
    - `!this.newTaskTitle`: evita quando o campo está vazio (`''`).
    - `!this.newTaskTitle.trim()`: evita quando o campo tem apenas espaços em branco (`' '` → `''`).
    - `title: this.newTaskTitle.trim()`: salva o texto sem espaços nas pontas.

---

### → Branch - fix/task-saving-bugs

### 7.  **(5.1. Bugs a Corrigir - Item 1)** Ao clicar no botão “Salvar”, a tarefa está sendo adicionada duas vezes e **(5.1. Bugs a Corrigir - Item 2)** Só está sendo possível salvar uma tarefa a primeira vez que clica no botão “Salvar”, só é possível salvar uma nova tarefa após atualizar a página (F5)

- **Causa provável do problema:**
    
    A função `addTask()` estava sendo chamada mais de uma vez ou de forma não controlada, e a lógica de controle anterior com `this.count` estava bloqueando adições posteriores após a primeira tarefa.
    
- No arquivo `todo-item.component.ts`
    
    ```tsx
    addTask() {
      const trimmedTitle = this.newTaskTitle.trim();
    
      if (!trimmedTitle) return;
    
      const newTodo: Todo = {
        id: this.todoService.getTodoNewId(),
        title: trimmedTitle,
        completed: false
      };
    
      this.todoService.addTodo(newTodo);
      this.newTaskTitle = '';
    }
    ```
    
    ### **Explicação técnica:**
    
    - `const trimmedTitle = this.newTaskTitle.trim();`: remove espaços em branco do início e fim do título.
    - `if (!trimmedTitle) return;`: impede que a tarefa seja adicionada se o campo estiver vazio **ou** contiver apenas espaços.
    - A lógica `this.count` foi **removida**, pois não era a abordagem correta para evitar cliques duplicados, ela acabava bloqueando qualquer nova adição de tarefa depois da primeira.
    
    **Resultado:** agora a tarefa só é adicionada **uma vez por clique** e **é possível continuar salvando novas tarefas normalmente**, sem precisar atualizar a página.
    

---

### → Branch - fix/toggle-completed-visibility

### 9. **(5.1. Bugs a Corrigir - Item 4)** O botão “Exibir Tarefas Concluídas” está, na verdade, ocultando as tarefas concluídas e **(5.1. Bugs a Corrigir - Item 5)** O botão “Ocultar Tarefas Concluídas” tem o comportamento invertido, exibindo as tarefas concluídas.

- No arquivo `todo.component.ts`:
    
    → Inclusão da chamada ao método `this.loadTodos()` após manipulações das tarefas addTodo(), updateTodo() e no deleteTodo(), para garantir que a lista fosse atualizada corretamente:
    
    ```tsx
    get toggleButtonLabel() {
      return this.showCompletedTasks ? 'Ocultar Tarefas Concluídas' : 'Exibir Tarefas Concluídas';
    }
    ```
    
    → Também foi adicionada a chamada ao método `this.loadTodos()` após cada operação de adição, atualização e remoção de tarefa, garantindo que a lista fosse sempre recarregada corretamente após essas ações:
    
    ```tsx
    this.todoService.addTodo(newTodo);
    this.loadTodos(); 
    
    this.todoService.updateTodo(updatedTodo);
    this.loadTodos();
    
    this.todoService.deleteTodo(todoId);
    this.loadTodos(); 
    ```
    
- No arquivo `todo.component.html`
    
    →  A listagem de tarefas foi atualizada para utilizar o método `filteredTodos()` no `*ngFor`, aplicando corretamente o filtro de visibilidade:
    
    ```html
    <app-todo-item
      *ngFor="let todo of filteredTodos()"
      [todo]="todo"
    ></app-todo-item>
    ```
    
    **→** O botão de alternância de visibilidade foi atualizado para exibir o texto dinâmico diretamente no HTML, de acordo com o estado atual da variável `showCompletedTasks`:
    
    ```html
    <button class="toggle-button" (click)="toggleCompletedTasks()">
      {{ showCompletedTasks ? 'Ocultar Tarefas Concluídas' : 'Exibir Tarefas Concluídas' }}
    </button>
    ```
    

---

### → Branch - fix/clear-completed-confirmation

### 10. **(5.1. Bugs a Corrigir - Item 6) Ao clicar em “Limpar Tarefas Concluídas”, a ação é executada sem pedir uma confirmação ao usuário e  (5.1. Bugs a Corrigir - Item 7) O botão “Limpar Tarefas Concluídas” está removendo as tarefas não concluídas em vez das concluídas.**

- **Problema:** A exclusão de tarefas concluídas era realizada imediatamente, sem qualquer tipo de confirmação por parte do usuário. O botão estava removendo tarefas incorretamente — inclusive as que **não** estavam marcadas como concluídas.
- **No arquivo `todo.component.ts`:**
    
    → **Adição de diálogo de confirmação** antes da exclusão:
    
    ```tsx
    if (confirm(`Você tem certeza que deseja limpar ${completedTodos.length} tarefa(s) concluída(s)?`)) {
      completedTodos.forEach(todo => {
        this.todoService.deleteTodo(todo.id);
      });
      this.loadTodos();
    }
    ```
    
    → **Filtro aplicado corretamente apenas às tarefas concluídas:**
    
    ```tsx
    const completedTodos = this.todos.filter(todo => todo.completed);
    ```
    
    **Resultado:** Agora a função **“Limpar Tarefas Concluídas”** exibe um alerta de confirmação **antes de excluir** e remove **somente** as tarefas que estão com o campo `completed` marcado como `true`.
    

---

## **Melhorias a Implementar**

### → Branch - feat/add-task-on-enter

### 1. (**5.2. Melhorias a Implementar - Item 2**) Permitir que o usuário adicione uma tarefa pressionando a tecla `Enter` no campo de texto, além do clique no botão “Salvar”

- No arquivo `new-task.component.html`:
→ Adicionado o evento `(keyup.enter)="addTask()"` no campo de input para capturar a tecla Enter:
    
    ```tsx
    <input
      id="new-task"
      class="new-task_input"
      type="text"
      [(ngModel)]="newTaskTitle"
      placeholder="Descreva aqui de forma breve a sua tarefa."
      (keyup.enter)="addTask()"
    />
    ```
  
---

### → Branch - feat/sort-tasks-az

### 2. (**5.2. Melhorias a Implementar - Item 1**) Implementar um botão “Ordenar de A a Z” que, ao ser clicado, ordene alfabeticamente a lista de tarefas visíveis.

- No arquivo :
    
    → Foi criado o método `sortTasksAZ()`, que ordena as tarefas não concluídas em ordem alfabética pelo título e mantém as tarefas concluídas ao final da lista:
    
    ```tsx
    sortTasksAZ() {
      const notCompleted = this.todos
        .filter(todo => !todo.completed)
        .sort((a, b) => a.title.localeCompare(b.title));
    
      const completed = this.todos.filter(todo => todo.completed);
    
      this.todos = [...notCompleted, ...completed];
    }
    ```
    
- No arquivo :  `todo.component.html`
    
    → Dentro do container dos botões, foi adicionado o botão para acionar a ordenação:
    
    ```tsx
    <button (click)="sortTasksAZ()">Ordenar de A a Z</button>
    ```
    

### Comportamento:

- Ao clicar no botão “Ordenar de A a Z”, as tarefas não concluídas são exibidas em ordem alfabética crescente.
- As tarefas concluídas são posicionadas ao final da lista, preservando sua ordem original.

### Explicação técnica

- `filter()` separa as tarefas em dois grupos: não concluídas e concluídas.
- `sort()` com `localeCompare` ordena alfabeticamente as tarefas não concluídas.

---

### → Branch - feat/add-multiple-tasks

### 3. (**5.2. Melhorias a Implementar - Item 3**) Permitir a adição de múltiplas tarefas de uma só vez. O usuário deverá digitar os títulos separados pelo caractere `|` (pipe).

- No arquivo `new-task.component.ts`
    
    → O método `addTask()` foi adaptado para processar múltiplos títulos:
    
    ```tsx
    addTask() {
      if (!this.newTaskTitle) return;
    
      const titles = this.newTaskTitle.split('|').map(t => t.trim()).filter(t => t.length > 0);
    
      if (titles.length === 0) return;
    
      titles.forEach(title => {
        const newTodo: Todo = {
          id: this.todoService.getTodoNewId(),
          title: title,
          completed: false
        };
        this.todoService.addTodo(newTodo);
      });
    ```
    

---

### → Branch - feat/filter-badwords

### 4. (**5.2. Melhorias a Implementar - Item 4**) Implementar um filtro de palavras obscenas. Caso o usuário tente cadastrar uma tarefa contendo um palavrão, exiba a mensagem: “Não é permitido cadastrar tarefas com palavras obscenas.” (Sugestão de biblioteca: `https://github.com/web-mech/badwords`).

- Foi integrado o pacote `bad-words` para validar se o título da tarefa contém palavras obscenas.
    
    ```bash
    npm install -g yarn
    npm install bad-words
    ```
    
- Caso o usuário tente cadastrar uma tarefa com palavrões, uma mensagem de alerta é exibida e a tarefa **não** é adicionada.
- No arquivo `new-task.component.ts`
    
    → Importação do filtro:
    
    ```tsx
    import { Filter } from 'bad-words';
    ```
    
    → Atualização do método `addTask()` para verificar múltiplos títulos separados por `|` e bloquear tarefas com palavras proibidas:
    
    ```tsx
    addTask() {
        if (!this.newTaskTitle) return;
    
        const filter = new (Filter);
      
        const titles = this.newTaskTitle.split('|').map(t => t.trim()).filter(t => t.length > 0);
      
        if (titles.length === 0) return;
    
        const hasBadWords = titles.some(title => filter.isProfane(title));
    
        if (hasBadWords) {
          alert('Não é permitido cadastrar tarefas com palavras obscenas.');
        return;
        }
      
        titles.forEach(title => {
          const newTodo: Todo = {
            id: this.todoService.getTodoNewId(),
            title: title,
            completed: false
          };
          this.todoService.addTodo(newTodo);
        });
    ```
    
    ### Explicação técnica:
    
    - A biblioteca `bad-words` fornece um método `isProfane()` para detectar palavrões em uma string.
    - O método `addTask` processa múltiplos títulos separados por pipe (`|`).
    - Caso qualquer título contenha uma palavra obscena, a inclusão é bloqueada e o usuário recebe uma mensagem de alerta.

---

### → Branch - feat/replace-alerts-with-sweetalert

### 5. (**5.2. Melhorias a Implementar - Item 6**) Substituir todos os `alert`s e `confirm`s nativos do navegador por uma experiência mais moderna, utilizando a biblioteca SweetAlert (Sugestão: `https://sweetalert2.github.io/`).

- Foi integrado o pacote `sweetalert2`
    
    ```bash
    npm install sweetalert2
    ```
    
- No arquivo `new-task.component.ts`
    
    → Foi adicionado o alerta customizado em addTask()
    
    ```tsx
    import Swal from 'sweetalert2';
    ...
    
    addTask() {
    ...
    	if (hasBadWords) {
    	  Swal.fire({
          icon: 'error',
          title: '',
          text: 'Não é permitido cadastrar tarefas com palavras obscenas.'
       });
       return;
      }
      ...
    }
    ```
    
- No arquivo `todo-item.component.ts`
    
    → Foi adicionado o alerta customizado em deleteTodo()
    
    ```tsx
    import Swal from 'sweetalert2';
    ...
    
    deleteTodo(): void {
        Swal.fire({
          title: 'Tem certeza?',
          text: 'Você tem certeza de que deseja deletar essa atividade?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Sim, deletar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.todoService.deleteTodo(this.todo.id);
            Swal.fire(
              'Deletado!',
              'A atividade foi deletada com sucesso.',
              'success'
            );
          }
        });
      }
    ```
    
- No arquivo `todo-item.component.ts`
    
    → Foram adicionados os alertas customizados em clearAll() e clearCompletedTasks()
    
    ```tsx
    import Swal from 'sweetalert2';
    ...
    
    clearAll() {
        if (this.todos.length === 0) return;
    
        Swal.fire({
          title: 'Tem certeza?',
          text: 'Você deseja limpar todas as tarefas?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sim, limpar tudo',
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6'
        }).then((result) => {
         if (result.isConfirmed) {
          this.todoService.clearAll();
          this.loadTodos();
          Swal.fire('Limpo!', 'Todas as tarefas foram removidas.', 'success');
          }
        });
      }
    
      clearCompletedTasks() {
        const completedTodos = this.todos.filter(todo => todo.completed);
    
        if (completedTodos.length === 0) {
          Swal.fire('Nada a limpar', 'Não há tarefas concluídas para limpar.', 'info');
          return;
        }
    
        Swal.fire({
          title: 'Tem certeza?',
          text: `Deseja limpar ${completedTodos.length} tarefa(s) concluída(s)?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sim, limpar',
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6'
        }).then((result) => {
          if (result.isConfirmed) {
            completedTodos.forEach(todo => {
              this.todoService.deleteTodo(todo.id);
            });
            this.loadTodos();
            Swal.fire('Concluído!', 'Tarefas concluídas foram removidas.', 'success');
          }
        });
      }
    ```
    

---

### → Branch - feat/export-pdf

### 5. (**5.2. Melhorias a Implementar - Item 5**) Adicionar a funcionalidade de exportar a lista de tarefas atual para um arquivo PDF. (Sugestão de biblioteca: `https://github.com/parallax/jsPDF`).

- Instalação da biblioteca
    
    ```bash
    npm install jspdf
    ```
    
- No arquivo `todo.component.ts`
    
    → Importação do jsPDF:
    
    ```tsx
    import { jsPDF } from 'jspdf';
    ```
    
    → Adição do método `exportPdf()` dentro da classe `TodoComponent`, junto aos outros métodos:
    
    ```tsx
    exportPdf() {
        const doc = new jsPDF();
    
        doc.setFontSize(18);
        doc.text('Lista de Tarefas', 14, 22);
    
        doc.setFontSize(12);
        let yPos = 30;
    
        this.todos.forEach((todo) => {
          const status = todo.completed ? '[x]' : '[ ]';
          const line = `${status} ${todo.title}`;
          doc.text(line, 14, yPos);
          yPos += 10;
    
          if (yPos > 280) {
            doc.addPage();
            yPos = 20;
          }
        });
    
        doc.save('tarefas.pdf');
      }
    ```
    
- No arquivo `todo.component.html`
    
    → Adicionado um botão em `.todo-buttons` para disparar a exportação
    
    ```html
    <button (click)="exportPdf()">Exportar para PDF</button>
    ```
    
- No arquivo `todo.component.css`
    
    → Na classe `.todo-buttons`, o `gap` foi ajustado de `1.5rem` para `0.9rem` para reduzir o espaçamento entre os botões e alinhá-los melhor ao container:
    
    ```css
    .todo-buttons {
      display: flex;
      width: 100%;
      margin-top: 0.8rem;
      justify-content: flex-end;
      align-items: center;
      gap: 0.9rem; /* modificação de espaçamento */
      margin-right: 5rem;
      flex-wrap: wrap;
    }
    ```
