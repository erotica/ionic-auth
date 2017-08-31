import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';

//let apiUrl = 'http://localhost:8080/api/';  // url to   
//let apiUrl = 'http://rest-service.guides.spring.io/greeting';
let apiUrl2 ='https://jsonplaceholder.typicode.com';

import { Todo } from '../pages/todo/todolist';

@Injectable()
export class AuthService {


private testapiurl= 'https://jsonplaceholder.typicode.com/posts';
private barcodeurl = 'https://jsonplaceholder.typicode.com/posts';

  private doctors = [];


  constructor(public http: Http) {}

  login(credentials) {
 
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        //Performs a request with post http method.
      // this.http.post(this.testapiurl, JSON.stringify(credentials), {headers: headers})
      this.http.post(this.testapiurl, {
        title: 'foo',
        body: 'bar',
        userId: 1
      }
    , {headers: headers})
        //this.http.get(this.testapiurl, {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  register(data) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post(apiUrl2+'guest/signup', JSON.stringify(data), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  logout(){
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('X-Auth-Token', localStorage.getItem('token'));

        this.http.post(apiUrl2+'logout', {}, {headers: headers})
          .subscribe(res => {
            localStorage.clear();
          }, (err) => {
            reject(err);
          });
    });
  }

   todoSearch(credentials) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        //Performs a request with post http method.
        //this.http.post(apiUrl+'/posts', JSON.stringify(credentials), {headers: headers})
        this.http.get(this.testapiurl, {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

   getStocks(): Promise<Todo[]> {
    return this.http.get(this.testapiurl)
        //.flatMap((response) => response.json())
        //.filter((person) => person.id > 5)
        
               .toPromise()
               .then(response => response.json().data as Todo[])
               .catch(this.handleError);
  }
  getStocks2() {
    return this.http.get(this.testapiurl)
               .toPromise()
               .then(response => response.json().data as Todo[])
               .catch(this.handleError);

  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
     // instead of Observable we return a rejected Promise
    return Promise.reject(error.message || error);
  }
 
  barSearch(credentials) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        //Performs a request with post http method.
        //this.http.post(apiUrl+'/posts', JSON.stringify(credentials), {headers: headers})
        this.http.get(this.barcodeurl, {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }
}