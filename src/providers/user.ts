import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
@Injectable()
export class UserService {
  constructor(public http: Http) {
    console.log('User::constructor()');
  }
  getUsers( callback ) {
    console.log("User::getUsers()");
    
    let url = "https://api.randomuser.me/?results=10";
    console.log(url);
    // 아래는 Promise 로 하는 방법
    this.http.get( url ) // Response of Observable
     .toPromise()      // get Observable & return Promise
      .then( data => {
        let body = JSON.parse( data['_body'] );
        console.log( body );
        callback( body['results'] );
      } );
      /**
       * 아래는 Objservable 로 하는 방법
      .map( e => e.json() ) // You only get the actual data without metadata, headers of the Response.
      .subscribe( data => {
        console.log(data);
        callback( data['results'] );
      } );
      */
  }

}

