import { Injectable } from '@angular/core';
import { Observable, of, } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../models/todo.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    constructor(
        private http: HttpClient
    ) { }


    public getTodoList(): Observable<Todo[]> {
       return this.http.get<Todo[]>(this.createApiUrl(''));
    }

    private createApiUrl(controllerName: string, methodAndParameters?: string): string {
        // const apiUrl = `${environment.todoApiUrl}/api/${controllerName}`;
        const apiUrl = `${environment.todoApiUrl}`;
        if (methodAndParameters) {
            return `${apiUrl}/${methodAndParameters}`;
        }

        return apiUrl;
    }
}
