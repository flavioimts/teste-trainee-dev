import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from '../../shared/services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() deletedTodo: EventEmitter<number> = new EventEmitter<number>();
  @Output() editTodoEvent: EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor(private todoService: TodoService) {}

  deleteTodo(): void {
    if (confirm('Tem certeza de que deseja excluir esta tarefa?')) {
      this.todoService.deleteTodo(this.todo.id);
    }
  }

  onTaskChecked(): void {
    this.todoService.updateTodo(this.todo);
  }

  editTodo(): void {
    this.editTodoEvent.emit(this.todo);
  }
}
