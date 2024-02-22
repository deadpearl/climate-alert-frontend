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

  public getOne(id) {
    return this.http.get('/internal/api/news/' + id).toPromise();
  }

  public createNews(news) {
    return this.http.post('/internal/api/news', news).toPromise();
  }

  public updateNews(id, news) {
    return this.http.put('/internal/api/news/' + id, news).toPromise();
  }

}
