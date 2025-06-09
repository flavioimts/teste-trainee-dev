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
  @Output() editTodoEvent: EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor(private todoService: TodoService) { }

  deleteTodo(): void {
    Swal.fire({
      title: 'Excluir tarefa',
      text: 'Tem certeza de que deseja excluir esta tarefa?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.todoService.deleteTodo(this.todo.id);

        Swal.fire({
          icon: 'success',
          title: 'Tarefa excluída!',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }

  onTaskChecked(): void {
    this.todoService.updateTodo(this.todo);
  }

  editTodo(): void {
    this.editTodoEvent.emit(this.todo);
  }
}
