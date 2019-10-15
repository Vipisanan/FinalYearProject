import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginURL = environment.apiBaseUrl + '/oauth/token';

  constructor(private _httpClient: HttpClient) {
  }

  isAuthenticated() {
    if (localStorage.getItem('isLogin')) {
      return true;
    }
    return false;
  }

  onLogin(loginPayload): Observable<any> {
    const headers = {
      'Authorization': 'Basic ' + btoa('devglan-client:devglan-secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    };


    return this._httpClient.post<any>(this.loginURL, loginPayload, {headers})
      .pipe(
        tap(x => console.log(x)),
        map(user => {
          console.log(user.refresh_token); //it's not a error it is working perfect
          if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          return user;
        }),
        catchError(this.handleError('login data', []))
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
