import { Todo } from './todo';
import { Component } from '@angular/core';
import { TodoDataService } from './todo-data.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./styles.scss'],
  templateUrl: './app.component.html',
  providers: [TodoDataService]
})
export class AppComponent {
  newTodo: Todo = new Todo();

  constructor(private todoDataService: TodoDataService) {}

  public addTodo(): void {
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
  }

  public toggleTodoComplete(todo): void {
    this.todoDataService.toggleTodoComplete(todo);
  }

  public removeTodo(todo): void {
    this.todoDataService.deleteTodoById(todo.id);
  }

  public allTodos(): number {
    return this.incompleteTodos.length + this.completeTodos.length;
  }
  public get incompleteTodos(): Array<Todo> {
    return this.todoDataService.getIncompleteTodos();
  }

  public get completeTodos(): Array<Todo> {
    return this.todoDataService.getCompleteTodos();
  }
}
