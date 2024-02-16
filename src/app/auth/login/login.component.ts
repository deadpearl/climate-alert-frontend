import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router, private authService: AuthService,
              private route: ActivatedRoute) {
  }
  form: any = {
    email: '',
    password: '',
  };
  authConfig = {
    issuer: 'https://accounts.google.com',
    redirectUri: window.location.origin,
    clientId: '489623114713-nkdu5u2vr4uopip76a3g9mgus6viloag.apps.googleusercontent.com',  // Замените на ваш Client ID
    responseType: 'code',
    scope: 'openid profile email',
  };
  ngOnInit() {

  }

  submitForm() {
    console.log(this.form);
    this.authService.loginData(this.form);
  }

  redirectToGoogle(): void {
    const clientId = '489623114713-nkdu5u2vr4uopip76a3g9mgus6viloag.apps.googleusercontent.com';
    const redirectUri = 'http://localhost:4200/user/profile';
    const scope = 'openid profile email';

    // tslint:disable-next-line:max-line-length
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;

    window.location.href = authUrl;
  }

}
