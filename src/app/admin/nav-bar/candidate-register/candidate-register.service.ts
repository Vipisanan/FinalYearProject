import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {environment} from "../../../../environments/environment";
import {catchError, map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CandidateRegisterService {

  getPartyURL = environment.apiBaseUrl + '/party';
  addCandidateURL = environment.apiBaseUrl + '/candidate';

  constructor(private httpClient:HttpClient) { }

  getPartyName() :Observable<any>{
    return this.httpClient.get(this.getPartyURL)
      .pipe(
        tap(x => console.log('fetch party color data')),
        map(value => value['content']),
        catchError(this.handleError('can not get data.'))
      );
  }



  addCandidate(value: any): Observable<any> {
    console.log(value);
    return this.httpClient.post<any>(this.addCandidateURL, value)
      .pipe(
        tap(x => console.log('fetch party color data')),
        map(data => data),
        catchError(this.handleError('can not get data.'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
