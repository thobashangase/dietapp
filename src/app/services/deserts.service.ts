import { Injectable } from '@angular/core';
import { Desert } from '../models/desert';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DesertsService {

  apiurl = 'http://thobashangase-001-site1.gtempurl.com/api/deserts';
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  perfop = {
    headers: this.headers
  };

  constructor(private http: HttpClient) { }

  private handleError(error: any) {
    console.error(error); 
    return throwError(error);
  }

  getDeserts(): Observable<Desert[]> {
    return this.http.get<Desert[]>(this.apiurl).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }
}
