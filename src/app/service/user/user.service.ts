import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  api_url = environment.api_url;
  username = localStorage.getItem('username');
  password = localStorage.getItem('password');

  private dataEdit = new BehaviorSubject<User>(null);
  botaoEdit = this.dataEdit.asObservable();

  getUsers(){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.http.get<User[]>(this.api_url + '/user', {headers}).pipe(
      map(
        userData =>{
          if(userData){
            return userData;
          }else{
            return [];
          }
        }
      )
    );
  }

  deleteUsers(id:number){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.http.delete<User>(this.api_url + '/user', {headers}).pipe(
      map(
        userData =>{
          return userData;
        }
      )
    );
  }

  createUser(user: User){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.http.post<User>(this.api_url + '/user', user, {headers}).pipe(
      map(
        userData =>{
          return userData;
        }
      )
    );
  }

  getUserForList(user: User){
    this.dataEdit.next(user);
  }

  updateUser(user: User){
    const id = user.id;
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.http.put<User>(this.api_url + '/user/'+ id, user, {headers}).pipe(
      map(
        userData =>{
          return userData;
        }
      )
    );
  } 
}
