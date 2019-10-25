import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {catchError, map, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AddElectionService {

  getUrl = environment.apiBaseUrl + '/election/types';
  getRegisteredElectionUrl = environment.apiBaseUrl + '/election';
  registeredElectionUrl = environment.apiBaseUrl + '/election/add-election/';
  activeElectionURL = environment.apiBaseUrl + '/election/';
  deActiveElectionURL=environment.apiBaseUrl + '/election/deactive/';
   // environment.apiBaseUrl + '/add-election/{id}';


  constructor(private httpClient:HttpClient) { }

  getAllTypesOfElection() :Observable<any> {
    return this.httpClient.get(this.getUrl)
      .pipe(
        tap(x => console.log('fetch party list data')),
        map(value => value['content']),
        catchError(this.handleError('can not get data.'))
      );
  }

  getRegisteredElection() :Observable<any> {
    return this.httpClient.get(this.getRegisteredElectionUrl)
      .pipe(
        tap(x => console.log('fetch party list data')),
        map(value => value['content']),
        catchError(this.handleError('can not get data.'))
      );
  }
  registerElection(id):Observable<any> {
    return this.httpClient.get(this.registeredElectionUrl+id)
      .pipe(
        tap(data => console.log('fetched register election data')),
        map(data => data),
        catchError(this.handleError('register data', [])),
      );
  }
  activeElection(id: any) :Observable<any>{
    return this.httpClient.get(this.activeElectionURL+id )
      .pipe(
        tap(data => console.log('fetched active election data')),
        map(data => data),
        catchError(this.handleError('register data', [])),
      );
  }

  deActiveElection(id: any) :Observable<any>{
    return this.httpClient.get(this.deActiveElectionURL+id )
      .pipe(
        tap(data => console.log('fetched deActive election data')),
        map(data => data),
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
