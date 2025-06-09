import { Component } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from '../../shared/services/todo.service';
import { Filter } from 'bad-words';

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

    const filter = new (Filter);
  
    const titles = this.newTaskTitle.split('|').map(t => t.trim()).filter(t => t.length > 0);
  
    if (titles.length === 0) return;

    const hasBadWords = titles.some(title => filter.isProfane(title));

    if (hasBadWords) {
      alert('Não é permitido cadastrar tarefas com palavras obscenas.');
    return;
    }
  
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
