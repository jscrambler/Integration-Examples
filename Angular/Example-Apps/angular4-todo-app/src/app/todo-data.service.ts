import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable()
export class TodoDataService {
  public lastId: number = 0;
  public todos: Todo[] = [];

  constructor() {}

  // Simulate POST /todos
  public addTodo(todo: Todo): TodoDataService {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    return this;
  }

  // Simulate DELETE /todos/:id
  public deleteTodoById(id: number): TodoDataService {
    this.todos = this.todos.filter(todo => todo.id !== id);
    return this;
  }

  public toggleTodoComplete(todo: Todo) {
    let updatedTodo = this._updateTodoById(todo.id, {
      complete: !todo.complete
    });
    return updatedTodo;
  }

  public getCompleteTodos(): Todo[] {
    return this.todos.filter(todo => todo.complete === true);
  }

  public getIncompleteTodos(): Todo[] {
    return this.todos.filter(todo => todo.complete === false);
  }

  // Simulate PUT /todos/:id
  private _updateTodoById(id: number, values: Object = {}): Todo {
    let todo = this._getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  // Simulate GET /todos/:id
  private _getTodoById(id: number): Todo {
    return this.todos.filter(todo => todo.id === id).pop();
  }
}
