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
  todoToEdit: Todo | null = null;

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
    if (this.todos.length > 0 && confirm('Are you sure you want to clear all tasks?')) {
      this.todoService.clearAll();
      this.loadTodos();
    }
  }

  clearCompletedTasks() {
    if (confirm('Tem certeza que deseja limpar todas as tarefas concluídas?')) {
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
    return 'Limpar Todas as Tarefas';
  }

  onEditTodo(todo: Todo) {
    this.todoToEdit = { ...todo };
  }

  onTaskSaved() {
    this.todoToEdit = null;
    this.loadTodos();
  }

  sortTodosAZ() {
    this.todos = [...this.todos].sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
  }

  exportToPDF() {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Lista de Tarefas', 10, 15);
    let y = 30;
    const todosParaExportar = this.filteredTodos();
    if (todosParaExportar.length === 0) {
      doc.text('Nenhuma tarefa para exportar.', 10, y);
    } else {
      todosParaExportar.forEach((todo, idx) => {
        doc.text(`${idx + 1}. [${todo.completed ? 'X' : ' '}] ${todo.title}`, 10, y);
        y += 10;
      });
    }
    doc.save('lista-tarefas.pdf');
  }
}
