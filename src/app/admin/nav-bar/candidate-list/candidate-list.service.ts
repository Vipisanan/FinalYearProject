import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CandidateListService {
  private getAllCandidateURL=environment.apiBaseUrl + '/candidate';
  private partyNominationURL=environment.apiBaseUrl + '/candidate/nomination/';
  private getAllNominatedCandidateURL=environment.apiBaseUrl + '/candidate/nominated-candidate';
  private generateCandidateNoURL=environment.apiBaseUrl + '/candidate/generate-no';

  constructor(private httpClient:HttpClient) { }

  getAllCandidate():Observable<any> {
    return this.httpClient.get(this.getAllCandidateURL)
      .pipe(
        tap(x => console.log('fetch getAllCandidate list data')),
        map(value => value['content']),
        catchError(this.handleError('can not get data.'))
      );
  }
  getAllNominatedCandidate() {
    return this.httpClient.get(this.getAllNominatedCandidateURL)
      .pipe(
        tap(x => console.log('fetch partyNomination list data')),
        map(value => value['content']),
        catchError(this.handleError('can not get data.'))
      );
  }

  partyNomination(cid: any, pid: any) :Observable<any> {
    return this.httpClient.get(this.partyNominationURL+cid+'/'+pid)
      .pipe(
        tap(x => console.log('fetch partyNomination list data')),
        catchError(this.handleError('can not get data.'))
      );
  }

  generateCandidateNo() :Observable<any> {
    return this.httpClient.get(this.generateCandidateNoURL)
      .pipe(
        tap(x => console.log('fetch generateCandidateNo list data')),
        // map(value => value['content']),
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
