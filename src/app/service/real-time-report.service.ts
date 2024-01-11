import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RealTimeReportService {

  constructor(private http: HttpClient) {
  }

  getCatalogueFireById(id) {
    return this.http.get(`/internal/api/data/RTData/by-id?id=${id}`).toPromise();
  }
  getRTReportByRTDataId(id) {
    return this.http.get(`/internal/report/get-all/fire-real-time/by-rt-data-id?rtDataId=${id}`).toPromise();
  }
}
