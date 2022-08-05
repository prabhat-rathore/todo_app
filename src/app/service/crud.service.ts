import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  serviceURL : string = '';
  constructor(private http : HttpClient) { 
    this.serviceURL = "https://flask-restful-api-todolist.herokuapp.com/todos"
  }
  addTask(task:Task): Observable<Task>
  {
    return this.http.post<Task>(this.serviceURL+'/'+task.id,task)
  }
  getAllTask(): Observable<Task[]>
  {
    return this.http.get<Task[]>(this.serviceURL)
  }
  deleteTask(taskId:number): Observable<Task>
  {
    return this.http.delete<Task>(this.serviceURL+'/'+taskId)
  }
  editTask(task:Task): Observable<Task>
  {
    return this.http.put<Task>(this.serviceURL+'/'+task.id,task)
  }
}
