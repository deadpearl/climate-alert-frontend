import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {UserService} from './user.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly loggedInKey = 'au-base-loggedIn';
  private readonly authKey = 'au-base-token';
  private logined = new Subject<string>();
  private logouted = new Subject<string>();

  logined$ = this.logined.asObservable();
  loguoted$ = this.logouted.asObservable();
  responsse: any = null;
  loggedIn() {
    return sessionStorage.getItem(this.loggedInKey) !== null;
  }

  get currentToken() {
    return sessionStorage.getItem(this.authKey);
  }

  constructor(private usersService: UserService, private http: HttpClient, private router: Router) {
  }

  getCurrentUser() {
    return this.http.get('/internal/api/public/user/v1/token/' + this.currentToken).toPromise();
  }
  public loginData(data) {
    return this.http.post('/internal/api/public/user/v1/login', data).subscribe(response => {
        this.responsse = response;
        sessionStorage.setItem(this.loggedInKey, 'true');
        sessionStorage.setItem(this.authKey, this.responsse.token);
        if (this.responsse.role === 'ROLE_ADMIN') {
          this.router.navigate(['admin/user/profile']);
        } else if (this.responsse.role === 'ROLE_EMPLOYEE') {
          this.router.navigate(['employee/user/profile']);
        } else {
          this.router.navigate(['user/profile']);
        }
      });
  }


  public logout() {
    sessionStorage.removeItem(this.authKey);
    sessionStorage.removeItem(this.loggedInKey);
    this.usersService.reloadUser();
    // Дёргаешь собитие
    this.logouted.next('disconnect');
    this.router.navigate(['/auth/login']);
  }

}
