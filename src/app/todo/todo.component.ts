import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/models/todo.model';
import { TodoService } from '../shared/services/todo.service';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  showCompletedTasks: boolean = true;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo(newTodoTitle: string) {
    const newTodo: Todo = {
      id: this.todos.length + 1,
      title: newTodoTitle,
      completed: false
    };

    this.todoService.addTodo(newTodo);
    this.loadTodos(); 
  }

  updateTodo(updatedTodo: Todo) {
    this.todoService.updateTodo(updatedTodo);
    this.loadTodos();
  }

  deleteTodo(todoId: number) {
    this.todoService.deleteTodo(todoId);
    this.loadTodos();
  }

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
  
  toggleCompletedTasks() {
    this.showCompletedTasks = !this.showCompletedTasks;
  }

  sortTasksAZ() {
    const notCompleted = this.todos
      .filter(todo => !todo.completed)
      .sort((a, b) => a.title.localeCompare(b.title));

    const completed = this.todos.filter(todo => todo.completed);

    this.todos = [...notCompleted, ...completed];
  }

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

  filteredTodos() {
    return this.showCompletedTasks ? this.todos : this.todos.filter(todo => !todo.completed);
  }

  get labelClearAll(){
    return 'Clear All'
  }

  get toggleButtonLabel() {
    return this.showCompletedTasks ? 'Ocultar Tarefas Concluídas' : 'Exibir Tarefas Concluídas';
  }
 }
