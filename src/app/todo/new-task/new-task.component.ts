import { Component } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent {
  newTaskTitle: string = '';
  
  constructor(private todoService: TodoService) { }

  // count = 0;
  addTask() {
    if (!this.newTaskTitle.trim()) return;

        if (!this.newTaskTitle.trim()) return;

    const titles = this.newTaskTitle
      .split('|')
      .map(title => title.trim())
      .filter(title => title.length > 0);

    let nextId = this.todoService.getTodoNewId();

    for (const title of titles){
    // if(this.count > 0) return
    const newTodo: Todo = {
      id: this.todoService.getTodoNewId(),
      title: title,
      completed: false
    };

    this.todoService.addTodo(newTodo);
    }
    // this.todoService.addTodo(newTodo);
    this.newTaskTitle = '';
    // this.count++
  }
}
