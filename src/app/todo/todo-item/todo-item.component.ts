import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from '../../shared/services/todo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() deletedTodo: EventEmitter<number> = new EventEmitter<number>();
  @Output() editTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor(private todoService: TodoService) {}

  async deleteTodo(): Promise<void> {
    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação irá remover a tarefa!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, remover',
      cancelButtonText: 'Cancelar'
    });
    if (result.isConfirmed) {
      this.todoService.deleteTodo(this.todo.id);
      Swal.fire('Removido!', 'A tarefa foi removida.', 'success');
    }
  }

  onTaskChecked(): void {
    this.todoService.updateTodo(this.todo);
  }

  onEdit(): void {
    this.editTodo.emit(this.todo);
  }
}
