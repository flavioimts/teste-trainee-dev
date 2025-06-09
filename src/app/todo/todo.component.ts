import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/models/todo.model';
import { TodoService } from '../shared/services/todo.service';

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
    if (this.todos.length > 0 && confirm('Você tem certeza de que deseja limpar todas as tarefas?')) {
      this.todoService.clearAll();
      this.loadTodos();
    }
  }

  clearCompletedTasks() {
    const completedTodos = this.todos.filter(todo => todo.completed);
    
    if (completedTodos.length === 0) {
      alert("Não há tarefas concluídas para limpar.");
      return;
    }
  
    if (confirm(`Você tem certeza que deseja limpar ${completedTodos.length} tarefa(s) concluída(s)?`)) {
      completedTodos.forEach(todo => {
        this.todoService.deleteTodo(todo.id);
      });
      this.loadTodos();
    }
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
