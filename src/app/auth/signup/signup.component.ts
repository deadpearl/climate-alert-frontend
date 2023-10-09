import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }
  currentStep = 1;
  form: any = {
    birthDate: '',
    email: '',
    firstName: '',
    lastName: '',
    middleName: '',
    password: '',
    phone: '',
    username: '',
  };

  ngOnInit() {
  }

  // Метод для перехода к следующему шагу
  nextStep() {
    this.currentStep++;
    console.log(this.form);
  }

  // Метод для возврата к предыдущему шагу
  prevStep() {
    this.currentStep--;
  }

  submitForm() {
    console.log(this.form);
    // Отправка данных формы на сервер
    this.http.post('/api/auth/authorize/register', this.form).subscribe(response => {
      // Обработка успешного ответа от сервера
      console.log('Success', response);
      this.router.navigate(['/']); // перенаправление на корневую страницу
    }, error => {
      // Обработка ошибки
      console.error('Error', error);
    });
  }

}
