import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class VoterListService {

  getUrl = environment.apiBaseUrl + '/user/all-users';

  constructor(private httpClient: HttpClient) { }

  getVoterList(): Observable<any> {
    return this.httpClient.get(this.getUrl)
      .pipe(
        tap(x => console.log('fetch voter list data')),
        map(value => value['content']),
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
