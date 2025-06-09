import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from 'src/app/shared/services/todo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnChanges {
  @Input() editingTodo: Todo | null = null;
  @Output() taskSaved: EventEmitter<Todo> = new EventEmitter<Todo>();
  newTaskTitle: string = '';

  constructor(private todoService: TodoService) { }

  addTask() {
    if (!this.newTaskTitle.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo obrigatório',
        text: 'Por favor, insira um título para a tarefa.',
      });
      return;
    }

    if (this.editingTodo) {
      this.editingTodo.title = this.newTaskTitle;
      this.todoService.updateTodo(this.editingTodo);
      this.editingTodo = null;
    } else {
      const newTodo: Todo = {
        id: this.todoService.getTodoNewId(),
        title: this.newTaskTitle,
        completed: false
      };
      this.todoService.addTodo(newTodo);
    }

    this.newTaskTitle = '';
    this.taskSaved.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["editingTodo"] && this.editingTodo) {
      this.newTaskTitle = this.editingTodo.title;
    }
  }
}
