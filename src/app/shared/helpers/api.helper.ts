import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


export function handleHttpError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
    }

    return throwError({
        ...error,
        localizedDescription: 'Something went wrong... :( Try again later :D.'
    });
}
