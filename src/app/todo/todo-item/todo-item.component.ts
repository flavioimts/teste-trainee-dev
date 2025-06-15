import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from '../../shared/services/todo.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

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
  


    Swal.fire({
      title:'Editar titulo',
      text:'Você vai editar essa atividae?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonText:'Sim',
      cancelButtonText:'Cancelar'
    }).then((result)=>{

          if(result.isConfirmed){
            const newTitle = prompt('Editar titulo: ', todo.title);
             
            if(newTitle !== null && newTitle.trim() !== ''){
              const updatedTodo ={
                ...todo,
                title:newTitle.trim()
              };
              this.todoService.updateTodo(updatedTodo);

            }else{
              Swal.fire('Titulo invalido', 'A tarefa não foi atualizada.', 'info')
            }
          }
        
    })


  }
 

  deleteTodo(): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você vai apagar essa atividade.',
      icon:'warning',
      showCancelButton:true,
      confirmButtonText: 'Sim',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
          this.todoService.deleteTodo(this.todo.id);
      }
    });

  }

  onTaskChecked(): void {
    this.todoService.updateTodo(this.todo);
  }
}
