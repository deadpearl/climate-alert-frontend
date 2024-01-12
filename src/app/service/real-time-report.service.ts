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

  getRTReportSearch(year, month) {
    return this.http.get(`/internal/api/data/RTData/search?year=${year}&month=${month}`).toPromise();
  }

  getRTReportPdf(requirementId, type = 'pdf', language =   'ru') {
    return this.http.get(`/internal/report/fire-real-time-overall?reportId=${requirementId}&lang=${language}&type=${type}`,
      {responseType: 'blob'}).toPromise();
  }

  createNewReport(data) {
    return this.http.post(`/internal/report/create/fire-real-time`, data).toPromise();
  }
}

