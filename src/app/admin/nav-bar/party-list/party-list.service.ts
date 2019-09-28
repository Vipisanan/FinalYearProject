import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {environment} from "../../../../environments/environment";
import {catchError, map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PartyListService {

  getUrl = environment.apiBaseUrl + '/party';
  partyNominationURL = environment.apiBaseUrl + '/party/nomination/';
  getAllActiveElectionURL = environment.apiBaseUrl + '/election/get-all-active-election/';
  // "nomination/{eId}/{pId}"

  constructor(private httpClient:HttpClient) { }

  getPartyList():Observable<any> {
    return this.httpClient.get(this.getUrl)
      .pipe(
        tap(x => console.log('fetch party list data')),
        map(value => value['content']),
        catchError(this.handleError('can not get data.'))
      );
  }

  partyNomination(electionId: any, id: any):Observable<any> {
    return this.httpClient.get(this.partyNominationURL+electionId +'/'+id)
      .pipe(
        tap(x => console.log('fetch party list data')),
        catchError(this.handleError('can not get data.'))
      );
  }


  getAllActiveElection():Observable<any> {
    return this.httpClient.get(this.getAllActiveElectionURL)
      .pipe(
        tap(x => console.log('fetch getAllActiveElection list data')),
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
