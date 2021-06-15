import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authentication, Contact, User } from 'src/app/model';
import { environment } from 'src/environments/environment';
import {map} from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  api = environment.api_url;
  username = localStorage.getItem('username');
  password = localStorage.getItem('password');
  private dataEdit = new BehaviorSubject<User>(null);
  botaoEdit = this.dataEdit.asObservable();


  authenticate(auth: Authentication){
     

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(auth.username + ':' + auth.password)});
    
    return this.http.get<any>(this.api + '/user/login',{headers}).pipe(
      map(
        authData =>{
          return authData;
        }
      )
    );
  }

}
