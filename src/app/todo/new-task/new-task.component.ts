import { Component } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from '../../shared/services/todo.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent {
  newTaskTitle: string = '';

  constructor(private todoService: TodoService) { }

  addTask() {
    const trimmedTitle = this.newTaskTitle.trim();

    if (!trimmedTitle) return;

    const newTodo: Todo = {
      id: this.todoService.getTodoNewId(),
      title: trimmedTitle,
      completed: false
    };

    this.todoService.addTodo(newTodo);
    this.newTaskTitle = '';
  }
}
