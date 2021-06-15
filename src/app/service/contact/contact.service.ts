import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from 'src/app/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  api_url = environment.api_url;
  username = localStorage.getItem('username');
  password = localStorage.getItem('password');
  private dataEdit = new BehaviorSubject<Contact>(null);
  botaoEdit = this.dataEdit.asObservable();

  //buscar contatos
  getContacts(){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.http.get<Contact[]>(this.api_url + '/contactura',{headers}).pipe(
      map(
        contactData =>{
          if(contactData){
            return contactData;
          }else{
            return [];
          }
        }
      )
    );
  }


//deletar contatos

  deleteContacts(id: number){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.http.delete<Contact>(this.api_url + '/contactura/' + id, {headers}).pipe(

      map(
        contactData =>{
          return contactData;
        }
      )

    );
  }

  //cadastrar contato
    createContact(contact: Contact){
      const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
      return this.http.post<Contact>(this.api_url + '/contactura', contact, {headers}).pipe(

        map(
          data =>{
            return data;
          }
        )
      );
    }

    
    getContactForlist(contact: Contact){
      this.dataEdit.next(contact);
    }

    //atualizar cotnato

    updateContact(contact: Contact){
      const id = contact.id;
      const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
      return this.http.put<Contact>(this.api_url + '/contactura/' + id, contact, {headers}).pipe(
        map(
          contactData =>{
            return contactData;
          }
        )

      );
    }





}  