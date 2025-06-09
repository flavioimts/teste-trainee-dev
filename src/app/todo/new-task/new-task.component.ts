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

  count = 0;
  addTask() {
    if(this.count > 0) return;
    
    // Impede salvar que tarefa vazia ou só com espaços
    if (!this.newTaskTitle || !this.newTaskTitle.trim())
      return;

    const newTodo: Todo = {
      id: this.todoService.getTodoNewId(),
      title: this.newTaskTitle.trim(),
      completed: false
    };

    this.todoService.addTodo(newTodo);
    this.newTaskTitle = '';
    // this.count++
  }
}
