import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo, NewTodo } from '../models/todo.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/core/auth.service';
import { catchError } from 'rxjs/operators';
import { handleHttpError } from 'src/app/shared/helpers/api.helper';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    constructor(
        private authService: AuthService,
        private http: HttpClient
    ) { }

    public getTodoList(): Observable<Todo[]> {
        return this.http
            .get<Todo[]>(this.createApiUrl('ToDos'))
            .pipe(
                catchError(handleHttpError)
            );
    }

    public getTodo(id: number): Observable<Todo> {
        return this.http.get(this.createApiUrl('ToDos', id.toString()))
        .pipe(
            catchError(handleHttpError)
        );
    }

    public addNewTodo(newTodo: NewTodo): Observable<any> {
        return this.http.post(this.createApiUrl('ToDos'), newTodo)
        .pipe(
            catchError(handleHttpError)
        );
    }

    public deleteTodo(id: number): Observable<any> {
        return this.http.delete(this.createApiUrl('ToDos', id.toString()))
        .pipe(
            catchError(handleHttpError)
        );
    }

    public updateTodo(updateTodo: Todo): Observable<any> {
        return this.http.put(this.createApiUrl('ToDos', updateTodo.id.toString()), updateTodo)
        .pipe(
            catchError(handleHttpError)
        );
    }

    private createApiUrl(controllerName: string, methodAndParameters?: string): string {
        const apiUrl = `${environment.todoApiUrl}/api/${controllerName}`;
        if (methodAndParameters) {
            return `${apiUrl}/${methodAndParameters}`;
        }
        return apiUrl;
    }
}
