import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
    TodoItem,
    NewTodoItem,
    TodoListItem,
    UpdateTodoItem
} from '../models/todo.model';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { handleHttpError } from 'src/app/shared/helpers/api.helper';
import { Store, select } from '@ngrx/store';
import { getCurrentCompany } from 'src/app/company/state/company.selectors';
import { CompanyItem } from 'src/app/company/models/company.model';


@Injectable({
    providedIn: 'root'
})
export class TodoService {
    private currentCompanyId = 0;

    constructor(private http: HttpClient, private store: Store<any>) {
        this.store
            .pipe(select(getCurrentCompany))
            .subscribe((currentCompany: CompanyItem) => {
                if (currentCompany != null) {
                    this.currentCompanyId = currentCompany.id;
                } else {
                    this.currentCompanyId = 0;
                }
            });
    }

    public getTodoList(): Observable<TodoListItem[]> {
        return this.http
            .get<TodoItem[]>(this.createApiUrl('ToDos'))
            .pipe(catchError(handleHttpError));
    }

    public getTodo(id: number): Observable<TodoItem> {
        return this.http
            .get(this.createApiUrl('ToDos', id.toString()))
            .pipe(catchError(handleHttpError));
    }

    public addNewTodo(newTodo: NewTodoItem): Observable<any> {
        return this.http
            .post(this.createApiUrl('ToDos'), newTodo)
            .pipe(catchError(handleHttpError));
    }

    public deleteCompletedTodo(): Observable<any> {
        return this.http
            .delete(this.createApiUrl('ToDos', 'deleteCompleted'))
            .pipe(catchError(handleHttpError));
    }

    public deleteTodo(id: number): Observable<any> {
        return this.http
            .delete(this.createApiUrl('ToDos', id.toString()))
            .pipe(catchError(handleHttpError));
    }

    public updateTodo(updateTodo: UpdateTodoItem): Observable<any> {
        return this.http
            .put(
                this.createApiUrl('ToDos', updateTodo.id.toString()),
                updateTodo
            )
            .pipe(catchError(handleHttpError));
    }

    public setTodoDoneState(id: number, isDone: boolean): Observable<any> {
        return this.http
            .put(this.createApiUrl('ToDos', `changeIsDoneState/${id}`), {
                isDone
            })
            .pipe(catchError(handleHttpError));
    }

    private createApiUrl(
        controllerName: string,
        methodAndParameters?: string
    ): string {
        const apiUrl = `${environment.apiUrl}/organizations/${this.currentCompanyId}/${controllerName}`;
        if (methodAndParameters) {
            return `${apiUrl}/${methodAndParameters}`;
        }
        return apiUrl;
    }
}
