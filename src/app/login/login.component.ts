import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Authentication, User } from '../model';
import { LoginService } from '../service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  myLogin: User = null;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  authentication: Authentication;
  constructor(public loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    document.querySelector('html').style.background = 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(65,65,236,1) 0%, rgba(0,212,255,1) 100%)';

  }

  ngOnDestroy(): void{
    document.querySelector('html').style.background = 'none';
  }

  login(){
    this.authentication = this.loginForm.value;
    if (this.loginForm.valid) {
        this.loginService.authenticate(this.authentication).subscribe(
          data => {

            //o metodo atob decodifica o hash em base64 do backend
            //Ja o btoa codifica em base64
            //o pipe deixa vc combinar varias funções em uma unica função.
            //The pipe() function takes as its arguments the functions you want to combine,
            // and returns a new function that, when executed,
            // runs the composed functions in sequence.
            const mydata = atob(data.split(':')[0]);
            const username = mydata.split(':')[0]
            const password = mydata.split(':')[1]
            const admin = data.split(':')[1]
            localStorage.setItem('username',username);
            localStorage.setItem('password',password);

            this.router.navigate(['/contact_list']);
          }
        );
    }else{
      Swal.fire({
        title: 'Ooops!',
        text: 'Preencha todos os campos',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
    }
  }

}
