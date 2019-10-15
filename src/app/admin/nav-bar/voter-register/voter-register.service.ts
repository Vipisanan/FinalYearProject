import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {FormGroup, NgForm} from "@angular/forms";
import {toNumbers} from "@angular/compiler-cli/src/diagnostics/typescript_version";

@Injectable({
  providedIn: 'root'
})
export class VoterRegisterService {
getUrl = environment.apiBaseUrl + '/gs-division';
  voterRegisterURL = environment.apiBaseUrl + '/user/voter-register-img';

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'bearer 43aaa5cf-3673-48af-a79b-96ae3cf2fff6',
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getAllGSDivision(): Observable<any> {
    return this.httpClient.get(this.getUrl)
      .pipe(
        tap(x => console.log('fetch gsdivision data')),
        map(value => value['content']),
        catchError(this.handleError('can not get data.'))
      );
  }

  voterRegister(voterRegisterModel: FormGroup, file: File ): Observable<any> {
    console.log(file);

    let formData = new FormData();
    formData.append('firstName', voterRegisterModel.value.firstName);
    formData.append('lastName', voterRegisterModel.value.lastName);
    formData.append('nicNo', voterRegisterModel.value.nicNo);
    formData.append('gsDivisionId', voterRegisterModel.value.gsDivisionId);
    formData.append('specificDetails', voterRegisterModel.value.specificDetails);
    formData.append('image', file);

    console.log(voterRegisterModel.value);


    return this.httpClient.post(this.voterRegisterURL, formData)
      .pipe(
        tap(),
        tap(data => console.log('fetched register data')),
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
