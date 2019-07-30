import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TodoItem, NewTodoItem, TodoListItem, UpdateTodoItem } from '../models/todo.model';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { handleHttpError } from 'src/app/shared/helpers/api.helper';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Store, select } from '@ngrx/store';
import { getCurrentCompany } from 'src/app/company/state/company.selectors';
import { CompanyItem } from 'src/app/company/models/company.model';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    constructor(
        private authService: AuthService,
        private http: HttpClient,
        private store: Store<any>
    ) { }

    
    currentCompanyId: number;
    private companyId(): number {
        this.store.pipe(select(getCurrentCompany)).subscribe(
            (currentCompany: CompanyItem) => {
              if(currentCompany != null) {
                this.currentCompanyId = currentCompany.id;
                return this.currentCompanyId;
              }
              else {
                this.currentCompanyId = 0;
                return this.currentCompanyId;
              }
            }
          );  
          return this.currentCompanyId;
    }

    public getTodoList(): Observable<TodoListItem[]> {
        return this.http
            .get<TodoItem[]>(this.createApiUrl(`organizations/${this.companyId()}/ToDos`))
            .pipe(
                catchError(handleHttpError)
            );
    }

    public getTodo(id: number): Observable<TodoItem> {
        return this.http.get(this.createApiUrl(`organizations/${this.companyId()}/ToDos`, id.toString()))
            .pipe(
                catchError(handleHttpError)
            );
    }

    public addNewTodo(newTodo: NewTodoItem): Observable<any> {
        return this.http.post(this.createApiUrl(`organizations/${this.companyId()}/ToDos`), newTodo)
            .pipe(
                catchError(handleHttpError)
            );
    }

    public deleteCompletedTodo(): Observable<any> {
        return this.http.delete(this.createApiUrl(`organizations/${this.companyId()}/ToDos`, 'deleteCompleted'))
            .pipe(
                catchError(handleHttpError)
            );
    }

    public deleteTodo(id: number): Observable<any> {
        return this.http.delete(this.createApiUrl(`organizations/${this.companyId()}/ToDos`, id.toString()))
            .pipe(
                catchError(handleHttpError)
            );
    }

    public updateTodo(updateTodo: UpdateTodoItem): Observable<any> {
        return this.http.put(this.createApiUrl(`organizations/${this.companyId()}/ToDos`, updateTodo.id.toString()), updateTodo)
            .pipe(
                catchError(handleHttpError)
            );
    }

    public setTodoDoneState(id: number, isDone: boolean): Observable<any> {
        return this.http.put(this.createApiUrl('ToDos', `changeIsDoneState/${id}`), { isDone })
            .pipe(
                catchError(handleHttpError)
            );
    }

    private createApiUrl(controllerName: string, methodAndParameters?: string): string {
        const apiUrl = `${environment.apiUrl}/${controllerName}`;
        if (methodAndParameters) {
            return `${apiUrl}/${methodAndParameters}`;
        }
        return apiUrl;
    }
}
