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
  
  constructor(private todoService: TodoService) {}

  /**
    * Corrigindo a funcionalide de editar dos items 
    * Abre um prompt para editar o título da tarefa.
    * Se o usuário confirmar, cria uma cópia atualizada da tarefa
    * e envia para o serviço atualizar os dados no armazenamento.
  */
  updateTodo(todo: Todo) {
  
    const updatedTodo = {
      ...todo,
      title: prompt('Editar título:', todo.title) || todo.title
    };
    this.todoService.updateTodo(updatedTodo);
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
