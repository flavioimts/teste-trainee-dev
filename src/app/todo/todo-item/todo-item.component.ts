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
  @Output() onUpdate = new EventEmitter<Todo>();

  constructor(private todoService: TodoService) {}

  isEditing: boolean = false;
  editedTitle: string = '';

  editTodo() {
    this.isEditing = true;
    this.editedTitle = this.todo.title;
  }

    saveEdit() {
    if (this.editedTitle.trim()) {
      const updatedTodo: Todo = {
        ...this.todo,
        title: this.editedTitle.trim()
      };
      this.onUpdate.emit(updatedTodo);
    }
    this.isEditing = false;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  deleteTodo(): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.todoService.deleteTodo(this.todo.id);
    }
  }

  onTaskChecked(): void {
    this.todoService.updateTodo(this.todo);
  }
}
