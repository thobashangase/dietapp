import { Injectable } from '@angular/core';
import { DailyDiet } from '../models/daily-diet';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AddDailyDiet } from '../models/add-daily-diet';
import { DietDetails } from '../models/diet-details';

@Injectable({
  providedIn: 'root'
})
export class DailyDietsService {

  apiurl = 'http://thobashangase-001-site1.gtempurl.com/api/dailydiets';
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  perfop = {
    headers: this.headers
  };

  constructor(private http: HttpClient) { }

  private handleError(error: any) {
    console.error(error); 
    return throwError(error);
  }

  getDailyDiets(): Observable<DailyDiet[]> {
    return this.http.get<DailyDiet[]>(this.apiurl);//.pipe(
    //   tap(data => console.log(data)),
    //   catchError(this.handleError)
    // );
  }

  getDailyDietById(id): Observable<DietDetails> {
    return this.http.get<DietDetails>(this.apiurl + '/' + id);
  }

  addDailyDiet(dailyDiet) {
    return this.http.post(this.apiurl, dailyDiet);
  }

  deleteDailyDiet(id): Observable<DietDetails> {
    return this.http.delete<DietDetails>(this.apiurl + '/' + id);
  }
}
