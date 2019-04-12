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
        return of<Todo[]>([
            {
                id: 1,
                name: 'blabla',
                userId: 0,
                created: new Date()
            },
            {
                id: 2,
                name: 'hello',
                description: 'toto je description',
                userId: 1,
                created: new Date()
            },
            {
                id: 3,
                name: 'world',
                userId: 1,
                created: new Date()
            }
        ]);
    }

    private createApiUrl(controllerName: string, methodAndParameters?: string): string {
        const apiUrl = `${environment.todoApiUrl}/api/${controllerName}`;

        if (methodAndParameters) {
            return `${apiUrl}/${methodAndParameters}`;
        }

        return apiUrl;
    }
}
