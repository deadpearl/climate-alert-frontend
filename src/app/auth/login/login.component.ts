import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient) { }

  form: any = {
    email: '',
    password: '',
  };
  ngOnInit() {
  }

  submitForm() {
    console.log(this.form);
    // Отправка данных формы на сервер
    this.http.post('/api/auth/authorize/authenticate', this.form).subscribe(response => {
      // Обработка успешного ответа от сервера
      console.log('Success', response);
    }, error => {
      // Обработка ошибки
      console.error('Error', error);
    });
  }
}
