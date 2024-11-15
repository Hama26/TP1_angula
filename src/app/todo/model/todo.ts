export type TodoStatus = 'waiting' | 'in progress' | 'done';

export class Todo {
  id: number;
  status: TodoStatus;

  constructor(public name = '', public content = '', status: TodoStatus = 'waiting') {
    this.id = Date.now(); // Generate unique ID
    this.status = status;
  }
}
