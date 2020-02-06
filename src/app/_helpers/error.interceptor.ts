import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UsersService } from '../services/users-service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private usersService: UsersService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            //debugger;
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.usersService.logout();
                
                console.log(err);
                //this.router.navigate(['/login']);
                
                location.reload(true);
            }

            const error = err.error || err.statusText;
            return throwError(error);
        }))
    }
}