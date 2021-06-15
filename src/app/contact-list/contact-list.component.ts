import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../model';
import Swal from 'sweetalert2';
import { ContactService } from '../service/contact/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

    contactList: Contact[] = [];
  constructor(private contactService: ContactService, private router: Router) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(){
    this.contactService.getContacts().subscribe(
      data =>{
        this.contactList = data;
      },
      error =>{
        Swal.fire({
          title: 'Ooops!',
          text: 'Erro ao retornar lista',
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      }
      
    );
  }

      deleteContact(id:number){
        this.contactService.deleteContacts(id).subscribe(
          data => {
            Swal.fire({
              title: 'Eeeeba!',
              text: 'Sucesso ao remover contato',
              icon: 'success',
              confirmButtonText: 'Okay'
            });
            this.router.navigate(['/contact_list']);
          }
        );
      }

      goToCreate(){
        this.router.navigate(['/contact']);
      }

      editContact(contact:Contact){
        this.contactService.getContactForlist(contact);
        this.router.navigate(['/contact']);
      }

}
