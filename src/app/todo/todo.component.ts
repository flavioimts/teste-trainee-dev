import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/models/todo.model';
import { TodoService } from '../shared/services/todo.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  showCompletedTasks: boolean = true;
  editingTodo: Todo | null = null;

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
  }

  updateTodo(updatedTodo: Todo) {
    this.todoService.updateTodo(updatedTodo);
  }

  deleteTodo(todoId: number) {
    this.todoService.deleteTodo(todoId);
  }

  clearAll() {
    Swal.fire({
      title: 'Limpar todas as tarefas',
      text: 'Tem certeza de que deseja limpar todas as tarefas?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, limpar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.todoService.clearAll();
        this.loadTodos();

        Swal.fire({
          icon: 'success',
          title: 'Tarefas limpas!',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }

  clearCompletedTasks() {
    Swal.fire({
      title: 'Limpar tarefas concluídas',
      text: 'Tem certeza de que deseja limpar todas as tarefas concluídas?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, limpar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.todoService.clearCompletedTasks();
        this.loadTodos();

        Swal.fire({
          icon: 'success',
          title: 'Tarefas concluídas limpas!',
          showConfirmButton: false,
          timer: 2000
        });
      }
    })
  }

  toggleCompletedTasks() {
    this.showCompletedTasks = !this.showCompletedTasks;
    this.loadTodos();
    this.todos = this.filteredTodos();
  }

  filteredTodos() {
    return this.showCompletedTasks ? this.todos : this.todos.filter(todo => !todo.completed);
  }

  get labelClearAll() {
    return 'Limpar Todas'
  }

  onEditTodo(todo: Todo): void {
    this.editingTodo = todo;
  }

  sortTodosByTitle() {
    this.todos.sort((a, b) => a.title.localeCompare(b.title));
  }

  exportToPDF() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Lista de Tarefas', 14, 22);

    doc.setFontSize(12);
    let yPosition = 30;

    if (this.todos.length === 0) {
      doc.text('Nenhuma tarefa para exibir.', 14, yPosition);
    } else {
      this.todos.forEach((todo, index) => {
        const status = todo.completed ? '[Concluído]' : '[Pendente]';
        const text = `${index + 1}. ${todo.title} ${status}`;
        doc.text(text, 14, yPosition);
        yPosition += 10;
        
        if (yPosition > 280) {
          doc.addPage();
          yPosition = 20;
        }
      });
    }

    doc.save('tarefas.pdf');
  }
}
