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
    if (!this.newTaskTitle) return;
  
    const titles = this.newTaskTitle.split('|').map(t => t.trim()).filter(t => t.length > 0);
  
    if (titles.length === 0) return;
  
    titles.forEach(title => {
      const newTodo: Todo = {
        id: this.todoService.getTodoNewId(),
        title: title,
        completed: false
      };
      this.todoService.addTodo(newTodo);
    });
  
    this.newTaskTitle = '';
  }
}
