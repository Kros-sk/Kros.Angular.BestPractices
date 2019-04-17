import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../models/todo.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/core/auth.service';
import { catchError, tap } from 'rxjs/operators';
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
                tap(x => console.log('TODOLIST', x)),
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
