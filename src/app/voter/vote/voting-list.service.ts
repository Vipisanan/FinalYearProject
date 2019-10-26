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
  checkFingerPrintUrl = environment.apiBaseUrl + '/user/find-by-finger-print/';

  nC1;
  nC2;
  nC3;
  nP1;
  nP2;
  nP3;
  url;

  constructor(private httpClient:HttpClient) { }


  getVotingList():Observable<any>{
    return this.httpClient.get(this.getUrl)
      .pipe(
        tap(data => console.log('fetched get voting list')),
        map(data => data['content']),
        catchError(this.handleError('register data', [])),
      );
  }

  checkFingerPrint(fingerPrint: String) :Observable<any>{
    console.log(this.checkFingerPrintUrl+fingerPrint);
    return this.httpClient.get(this.checkFingerPrintUrl+fingerPrint)
      .pipe(
        tap(data => console.log('fetched get voterID')),
        map(data => data['content']),
        catchError(this.handleError('voterID data', [])),
      );
  }


  addVote(nominatedCandidateId: Array<number>, nominatedPartyId: Array<String>, voterId: string): Observable<any> {
    this.url = null;
    this.url = environment.apiBaseUrl + '/result/voter/' + voterId;
    if (nominatedCandidateId.length === 1) {
      this.url = this.url + '?cId=' + nominatedCandidateId[0];
    }
    if (nominatedCandidateId.length === 2) {
      this.url = this.url + '?cId=' + nominatedCandidateId[0] + '&cId=' + nominatedCandidateId[1];
    }
    if (nominatedCandidateId.length === 3) {
      this.url = this.url + '?cId=' + nominatedCandidateId[0] + '&cId=' + nominatedCandidateId[1] + '&cId=' + nominatedCandidateId[2];
    }

    if (nominatedPartyId.length === 1) {
      this.url = this.url + '&pId=' + nominatedPartyId[0];
    }
    if (nominatedPartyId.length === 2) {
      this.url = this.url + '&pId=' + nominatedPartyId[0] + '&pId=' + nominatedPartyId[1];
    }
    if (nominatedPartyId.length === 3) {
      this.url = this.url + '&pId=' + nominatedPartyId[0] + '&pId=' + nominatedPartyId[1] + '&pId=' + nominatedPartyId[2];
    }
    console.log("uuuuuuuuuuu", this.url);
    return this.httpClient.get(this.url)
      .pipe(
        tap(data => console.log('fetched get voterID')),
        map(data => data['content']),
        catchError(this.handleError('vote data', [])),
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
