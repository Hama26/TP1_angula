import { Injectable, signal, computed, inject } from '@angular/core';
import { Todo, TodoStatus } from '../model/todo';
import { LoggerService } from '../../services/logger.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private loggerService = inject(LoggerService);

  // Signal to store all todos
  private todosSignal = signal<Todo[]>([]);

  // Computed signals for todos filtered by status
  waitingTodos = computed(() =>
    this.todosSignal().filter((todo) => todo.status === 'waiting')
  );

  inProgressTodos = computed(() =>
    this.todosSignal().filter((todo) => todo.status === 'in progress')
  );

  doneTodos = computed(() =>
    this.todosSignal().filter((todo) => todo.status === 'done')
  );

  /**
   * Returns all todos as a regular array
   */
  getTodos(): Todo[] {
    return this.todosSignal();
  }

  /**
   * Adds a new Todo with default status ('waiting')
   */
  addTodo(todo: Todo): void {
    this.todosSignal.update((todos) => [...todos, todo]);
  }

  /**
   * Updates the status of a Todo
   */
  updateTodoStatus(id: number, newStatus: TodoStatus): void {
    this.todosSignal.update((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo
      )
    );
  }

  /**
   * Deletes a Todo if it exists
   */
  deleteTodo(todo: Todo): boolean {
    const todos = this.todosSignal();
    const index = todos.indexOf(todo);
    if (index > -1) {
      this.todosSignal.update((todos) => todos.filter((_, i) => i !== index));
      return true;
    }
    return false;
  }

  /**
   * Logs the current list of todos
   */
  logTodos(): void {
    this.loggerService.logger(this.todosSignal());
  }

  /**
   * Clears all Todos
   */
  clearTodos(): void {
    this.todosSignal.set([]);
  }
}
