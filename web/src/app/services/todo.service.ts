import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly API_URL = 'http://localhost:8012/api/Todos';
  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getAllTodo(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.API_URL);
  }

  getTodo(startDate: Date, endDate: Date): Observable<Todo[]> {

    function formatDate(date: Date) {
      const offset = date.getTimezoneOffset()
      // var d = new Date(date.getTime() - (offset*60*1000));
      //     month = '' + (d.getMonth() + 1),
      //     day = '' + d.getDate(),
      //     year = d.getFullYear();

      // if (month.length < 2)
      //     month = '0' + month;
      // if (day.length < 2)
      //     day = '0' + day;

      // return [year, month, day].join('-');
      return date.toISOString();
    }

    let params = new HttpParams()
      .set('from', formatDate(startDate))
      .set('to', formatDate(endDate));
    return this.httpClient.get<Todo[]>(this.API_URL, { params: params});
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

  patchTodo(id: number, body: Todo): Observable<Todo> {
    return this.httpClient.patch<Todo>(this.API_URL + `/${id}`, body);
  }

  deleteTodo(id: number): Observable<Object> {
    return this.httpClient.delete<Object>(this.API_URL + `/${id}`);
  }

}
