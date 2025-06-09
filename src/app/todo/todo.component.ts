import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/models/todo.model';
import { TodoService } from '../shared/services/todo.service';
import Swal from 'sweetalert2';

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

  get labelClearAll(){
    return 'Limpar Todas'
  }

  onEditTodo(todo: Todo): void {
    this.editingTodo = todo;
  }

  sortTodosByTitle() {
    this.todos.sort((a, b) => a.title.localeCompare(b.title));
  }
}
