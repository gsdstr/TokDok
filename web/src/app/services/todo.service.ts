import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly API_URL = 'http://localhost:8080/api/Todos';
  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getAllTodo(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.API_URL);
  }

  getTodoById(id: number): Observable<Todo> {
    return this.httpClient.get<Todo>(this.API_URL + `?${id}`);
  }

  createTodo(body: Todo): Observable<Todo> {
    return this.httpClient.post<Todo>(this.API_URL, body);
  }

  updateTodo(id: number, body: Todo): Observable<Todo> {
    return this.httpClient.put<Todo>(this.API_URL + `/${id}`, body);
  }

  deleteTodo(id: number): Observable<Object> {
    return this.httpClient.delete<Object>(this.API_URL + `/${id}`);
  }

}
