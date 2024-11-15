import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../service/todo.service';
import { Todo, TodoStatus } from '../model/todo';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  waitingTodos = this.todoService.waitingTodos; // Computed signal for "waiting" todos
  inProgressTodos = this.todoService.inProgressTodos; // Computed signal for "in progress" todos
  doneTodos = this.todoService.doneTodos; // Computed signal for "done" todos
  newName = '';
  newContent = '';

  constructor(private todoService: TodoService) {}

  // Add a new todo
  addTodo() {
    if (this.newName.trim() && this.newContent.trim()) {
      const newTodo = new Todo(this.newName, this.newContent); // Create a new todo
      this.todoService.addTodo(newTodo); // Add the todo
      this.newName = '';
      this.newContent = ''; // Reset the form
    }
  }

  // Change the status of a todo
  changeStatus(todo: Todo, newStatus: TodoStatus) {
    this.todoService.updateTodoStatus(todo.id, newStatus);
  }

  // Delete a todo
  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }
}
