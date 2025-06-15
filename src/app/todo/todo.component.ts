import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { Todo } from '../shared/models/todo.model';
import { TodoService } from '../shared/services/todo.service';
import {jsPDF} from 'jspdf'
import html2canvas from 'html2canvas'
import Swal from 'sweetalert2';



@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})



export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  showCompletedTasks: boolean = true;

 constructor(private todoService: TodoService) { }




  ngOnInit(): void {
    this.loadTodos();
  }

  //Criação da função para exportar a pagina em pdf. 
  exportToPDF() {
  const content = document.getElementById('todo-list');
 
  

  if (!content) return;

  const originalBg = content.style.backgroundColor;


  content.style.backgroundColor = 'white';

  // Aqui aguarfamos o DOM atualizar completamente antes de capturar
  setTimeout(() => {
    html2canvas(content).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('lista-de-tarefas.pdf');
    });
  }, 100); // pequena espera para o DOM estabilizar
}


  loadTodos() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo(newTodoTitle: string) {
    const newTodo: Todo = {
      id: this.todos.length + 1,
      title: newTodoTitle,
      completed: false
    };

    this.todoService.addTodo(newTodo);
  }

  updateTodo(updatedTodo: Todo) {
    this.todoService.updateTodo(updatedTodo);
  }

  deleteTodo(todoId: number) {
    this.todoService.deleteTodo(todoId);
  }

  clearAll() {
    if (this.todos.length===0) return;
    Swal.fire({
      title:"Você tem certeza?",
      text:"Isso vai apagar todas as tarefas!",
      icon: "warning",
      showCancelButton:true,
      confirmButtonText:'Sim, apagar Tudo',
      cancelButtonText:'Cancelar'
    })


  }

  clearCompletedTasks() {
    if(this.todos.length===0) return;

    Swal.fire({
      title:"Voce tem certeza?",
      text:"Isso vai apagar todas atividades concluidas",
      icon:"warning",
      showCancelButton:true,
      confirmButtonText:"Sim, apagar tudo!",
      cancelButtonText:'Cancelar'
    })

  }

  toggleCompletedTasks() {
    this.showCompletedTasks = !this.showCompletedTasks;
    this.loadTodos();
    this.todos = this.filteredTodos();
  }

  filteredTodos() {
    return this.showCompletedTasks ? this.todos : this.todos.filter(todo => !todo.completed);
  }

  //Criação de um metodo que usa de services para ordenar as tarefas
  sortTodos():void{
    this.todoService.sortTodosByName();
    this.loadTodos();

  }

  get labelClearAll(){
    return 'Clear All'
  }
}
