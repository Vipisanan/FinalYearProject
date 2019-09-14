import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {VoterRegisterModel} from "../../models/VoterRegisterModel";

@Injectable({
  providedIn: 'root'
})
export class VoterRegisterService {
getUrl = environment.apiBaseUrl + '/gs-division';
  voterRegisterURL = environment.apiBaseUrl + '/user/voter-register';
  constructor(private httpClient: HttpClient) { }

  getAllGSDivision(): Observable<any> {
    return this.httpClient.get(this.getUrl)
      .pipe(
        tap(x => console.log('fetch gsdivision data')),
        map(value => value['content']),
        catchError(this.handleError('can not get data.'))
      );
  }

  voterRegister(voterRegisterModel: VoterRegisterModel[]) :Observable<any> {
    return this.httpClient.post(this.voterRegisterURL , voterRegisterModel)
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
