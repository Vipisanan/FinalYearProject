import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class VotingListService {
  getUrl = environment.apiBaseUrl + '/voting/election';

  constructor(private httpClient:HttpClient) { }


  getVotingList():Observable<any>{
    return this.httpClient.get(this.getUrl)
      .pipe(
        tap(data => console.log('fetched get voting list')),
        map(data => data['content']),
        catchError(this.handleError('register data', [])),
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
