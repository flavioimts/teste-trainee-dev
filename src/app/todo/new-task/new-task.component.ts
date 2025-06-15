import { Component } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from 'src/app/shared/services/todo.service';
import {Filter} from 'bad-words'
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})



export class NewTaskComponent {
  newTaskTitle: string = '';

  constructor(private todoService: TodoService) { }

  //Criando uma função para fazer o split das entradas por 
   //Funcionamento
    /**
     * A função recebe uma entrada(input) e aplicamos varias
     * varias funções ao corpo da entrada: split que separa 
     * a string conforme o caracter entre aspoas simples
     * , map+trim que para cada nova string remove os espaços
     * entre um e outro e por fim verificar se há entradas vazias
     *
     */

  private parseTaskTitles(input:string): string[]{
    return input
    .split('|')
    .map(title => title.trim())
    .filter(title=>title.length>0);
  }


  addTask() {
  
    //Funcionamento
    /**
     * Criamos uma varival taskTitles que recebe os valores de
     * parseTaskTitles. Depois usamos o foreach para gerar as 
     * atividades fornecendo a cada uma um ID, Title, e estado
     * e ao fim adicionamos da lista
     */
    const taskTitles = this.parseTaskTitles(this.newTaskTitle);
    const filter = new Filter();
    if(taskTitles.length === 0 ) {
      alert('Titulo não pode estar vázio');
      return;
    }


    for(const title of taskTitles){

      if(filter.isProfane(title)){
        alert("A entrada contem linguagem impropria")
        return;
      }
      const newTodo: Todo = {
      id: this.todoService.getTodoNewId(),
      title,
      completed: false
    };
    this.todoService.addTodo(newTodo);
    }


    
    
    this.newTaskTitle = '';

  }
}
