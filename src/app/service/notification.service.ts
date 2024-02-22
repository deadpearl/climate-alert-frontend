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
  public getOne(id, type) {
    return this.http.get(`/internal/api/notification/service/get-by-id?id=${id}&notificationType=${type}`).toPromise();
  }
}
