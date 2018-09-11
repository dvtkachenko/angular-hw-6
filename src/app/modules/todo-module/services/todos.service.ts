import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models';

@Injectable()
export class TodosService {

  private restApiUrl: string = environment.rest_api_url;

  constructor(private httpClient: HttpClient) { 
  }

  public getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(`${this.restApiUrl}/todos`);
  }

  public getTodo(id: string): Observable<Todo> {
    return this.httpClient.get<Todo>(`${this.restApiUrl}/todos/${id}`);
  }  
  
  public createTodo(todos: Todo): Observable<Todo> {
    return this.httpClient.post<Todo>(`${this.restApiUrl}/todos`, todos);
  }

  public updateTodo(todos: Todo): Observable<Todo> {
    return this.httpClient.put<Todo>(`${this.restApiUrl}/todos/${todos.id}`, todos);
  }

  public deleteTodo(id: number): Observable<Object> {
    return this.httpClient.delete<Object>(`${this.restApiUrl}/todos/${id}`);
  }    
}
