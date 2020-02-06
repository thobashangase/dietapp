import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Register  } from '../models/register';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError, BehaviorSubject} from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
    apiurl = 'http://thobashangase-001-site1.gtempurl.com/auth';
    headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    perfop = {
      headers: this.headers
    };

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
  
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('LoggedInUser')));
        this.currentUser = this.currentUserSubject.asObservable();
     }
  
    private handleError(error: any) {
      console.error(error);
      return throwError(error);
    }

    register(user: Register) {
        return this.http.post(this.apiurl + "/register", user);
    }

    login(model: Login) {
        return this.http.post<any>(this.apiurl + "/login", model).pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('LoggedInUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
        }));
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('LoggedInUser');
        this.currentUserSubject.next(null);
    }
}