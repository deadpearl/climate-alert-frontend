import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private http: HttpClient) {
  }
  public getAllNotification(email) {
    return this.http.get(`/internal/api/notification/service/all?email=` + email).toPromise();
  }
}
