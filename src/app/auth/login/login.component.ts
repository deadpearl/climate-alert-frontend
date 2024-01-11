import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  form: any = {
    email: '',
    password: '',
  };
  ngOnInit() {
  }

  submitForm() {
    console.log(this.form);
    this.authService.loginData(this.form);
  }
}
