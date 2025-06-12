import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/models/todo.model';
import { TodoService } from '../shared/services/todo.service';
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
  }
  
  exportToPDF() {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('Lista de Tarefas', 10, 10);

  const tarefas = this.filteredTodos(); 

  tarefas.forEach((todo, index) => {
    const status = todo.completed ? '[X]' : '[ ]';
    doc.text(`${status} ${todo.title}`, 10, 20 + index * 10);
  });

  doc.save('tarefas.pdf');
}

  sortTodosAZ() {
  this.todos = this.filteredTodos().sort((a, b) => a.title.localeCompare(b.title));
}


  updateTodo(updatedTodo: Todo) {
    this.todoService.updateTodo(updatedTodo);
  }

  deleteTodo(todoId: number) {
    this.todoService.deleteTodo(todoId);
  }

  clearAll() {
    if (this.todos.length > 0 && confirm('Are you sure you want to clear all tasks?')) {
      this.todoService.clearAll();
      this.loadTodos();
    }
  }

  clearCompletedTasks() {
    if (this.todos.length > 0 && confirm('Are you sure you want to clear all completed tasks?')) {
        this.todoService.clearCompletedTasks();
        this.loadTodos();
    }
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
    return 'Clear All'
  }
}
