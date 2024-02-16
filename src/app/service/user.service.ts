import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserPromise: Promise<any> = null;

  constructor(private http: HttpClient) {
  }

  public reloadUser() {
    this.currentUserPromise = null;
  }

  public getAllUsers() {
    return this.http.get('/internal/api/public/user/v1/users/all').toPromise();
  }
  public updateUser(data) {
    return this.http.post('/internal/api/public/user/v1/users/update', data).toPromise();
  }
  public getUserById(id) {
    return this.http.get('/internal/api/public/user/v1/users/' + id).toPromise();
  }
  public getAllUserEmployee() {
    return this.http.get('/internal/api/public/user/v1/users/role-employee').toPromise();
  }

  public getAdmins() {
    return this.http.get('/internal/api/public/user/v1/users/role-admin').toPromise();
  }
  public getRegisteredAdminEmployees(email) {
    return this.http.get('/internal/api/public/user/v1/users/get/admin-employees?email=' + email).toPromise();
  }

  public registerEmployees(data) {
    return this.http.post('/internal/api/public/user/v1/users/register-employee', data).toPromise();
  }

}
