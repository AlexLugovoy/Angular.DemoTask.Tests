import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../models/login';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private _authService: AuthService,
              private _router: Router) { }

  formAuth = new FormGroup({
    email: new FormControl('',[Validators.email, Validators.required]),
    password: new FormControl('',[Validators.required])
  });

  ngOnInit(): void {
  }

  onSubmit(){
    let login = new Login();
    login = Object.assign(login, this.formAuth.value);

    this._authService.Login(login).subscribe((data:any) =>
      {
        localStorage.setItem('token', data.message);
        localStorage.setItem('token_date', data.expireDate);
        this._router.navigate(["/tests"]);
      },
      error => {
        alert(error.error);
      });
  }

}
