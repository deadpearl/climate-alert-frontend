import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private http: HttpClient) {
  }

  public getAll() {
    return this.http.get('/internal/api/news').toPromise();
  }


}
