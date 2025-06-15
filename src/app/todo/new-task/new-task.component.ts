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

  count = 0;
  addTask() {
    //Adicionado durante o segundo commit
    //Resolve os bugs 12 e 13 mencionados
    if(!this.newTaskTitle.trim()) {

      alert('Titulo não pode estar vázio');
      return;
    }
    const newTodo: Todo = {
      id: this.todoService.getTodoNewId(),
      title: this.newTaskTitle,
      completed: false
    };
    //addTodo sendo chamado duas vezes aqui
  
    this.todoService.addTodo(newTodo);
    this.newTaskTitle = '';

  }
}
