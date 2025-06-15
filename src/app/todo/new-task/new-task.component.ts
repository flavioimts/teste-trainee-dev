import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from '../../shared/services/todo.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnChanges {
  @Input() editTodo: Todo | null = null;
  @Output() taskSaved = new EventEmitter<void>();
  newTaskTitle: string = '';
  editingId: number | null = null;
  errorMessage: string = '';

  constructor(private todoService: TodoService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editTodo'] && this.editTodo) {
      this.newTaskTitle = this.editTodo.title;
      this.editingId = this.editTodo.id;
    }
  }

  addTask() {
    const trimmedTitle = this.newTaskTitle ? this.newTaskTitle.trim() : '';
    if (!trimmedTitle) {
      this.errorMessage = 'O título da tarefa é obrigatório.';
      return;
    }
    if (trimmedTitle.length < 10) {
      this.errorMessage = 'O título da tarefa deve ter no mínimo 10 caracteres.';
      return;
    }
    this.errorMessage = '';
    if (this.editingId) {
      // Atualizar tarefa existente
      const updatedTodo: Todo = {
        id: this.editingId,
        title: trimmedTitle,
        completed: this.editTodo?.completed || false
      };
      this.todoService.updateTodo(updatedTodo);
      this.editingId = null;
      this.editTodo = null;
    } else {
      // Criar nova tarefa
      const newTodo: Todo = {
        id: this.todoService.getTodoNewId(),
        title: trimmedTitle,
        completed: false
      };
      this.todoService.addTodo(newTodo);
    }
    this.newTaskTitle = '';
    this.taskSaved.emit();
  }
}
