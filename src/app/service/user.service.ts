import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserPromise: Promise<any> = null;

  constructor(private http: HttpClient) {
  }

  getUserName(curUser) {
    return [curUser.LAST_NAME, curUser.FIRST_NAME, curUser.PATRONYMIC].filter(name => name).join(' ');
  }
  public reloadUser() {
    this.currentUserPromise = null;
  }
  // getCurrentUser() {
  //   if (this.currentUserPromise) {
  //     return this.currentUserPromise;
  //   }
  //   this.currentUserPromise = this.http.get('/internal/api/public/v1/token/').toPromise();
  //   return this.currentUserPromise;
  // }

  // public saveProfile(profileData: any): Promise<any> {
  //   return this.apiService.put("/user/profile", profileData).toPromise().then(
  //     () => {
  //       this.currentUserPromise = null;
  //       return this.getCurrentUser()
  //     }
  //   )
  // }
  //
  // public participantsList(page, limit, sort_by = null, increase = null) {
  //   return this.apiService.get(`/user/list/company`, { page: page - 1, limit, sort_by, increase })
  // }
  //
  // public loadParticipant(iin) {
  //   return this.apiService.get(`/user/change_data?iin=${iin}`)
  // }
  //
  // public saveParticipant(iin, data) {
  //   return this.apiService.put(`/user/change_data?iin=${iin}`, data)
  // }
  //
  // public deleteParticipants(iins: any[]) {
  //   return this.apiService.delete('/user/delete', iins);
  // }
  //
  // public list(page, limit, filters) {
  //   return this.apiService.get("/user/list", Object.assign({}, { page: page - 1, limit }, filters));
  // }
  //
  //
  // resetPassword(passwordData) {
  //   return this.apiService.put("/user/reset_password", passwordData);
  // }
}
