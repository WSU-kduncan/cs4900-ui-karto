import { HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export function errorInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<any> {
    return next(request).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage = 'An error occurred';

            if (error.error instanceof ErrorEvent) {
                // Client-side error
                errorMessage = `Error: ${error.error.message}`;
            } else {
                // Server-side error
                errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }

            console.error('HTTP Error:', errorMessage);
            return throwError(() => error);
        })
    );
}