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

  getRTReportSearch(year, month, email) {
    return this.http.get(`/internal/report/search?year=${year}&month=${month}&email=${email}`).toPromise();
  }
  getRTDataSearch(year, month, email) {
    return this.http.get(`/internal/api/data/RTData/search?year=${year}&month=${month}&email=${email}`).toPromise();
  }

  getRTReportPdf(requirementId, type = 'pdf', language =   'ru') {
    return this.http.get(`/internal/report/fire-real-time-overall?reportId=${requirementId}&lang=${language}&type=${type}`,
      {responseType: 'blob'}).toPromise();
  }
  getRTEconomicReportPdf(requirementId, type = 'pdf', language =   'ru') {
    return this.http.get(`/internal/report/fire-real-time-economic-damage?reportId=${requirementId}&lang=${language}&type=${type}`,
      {responseType: 'blob'}).toPromise();
  }

  createNewReport(data) {
    return this.http.post(`/internal/report/create/fire-real-time`, data).toPromise();
  }
  getRegion(id) {
    return this.http.get(`/internal/api/data/Regions/get-by-id?id=${id}`).toPromise();
  }
  getListEmployeesByEmployee(email) {
    return this.http.get(`/internal/api/public/user/v1/users/get/admin-employees/by-employee?email=${email}`).toPromise();
  }
  assign(id, assignment) {
    return this.http.put(`/internal/report/assign/fire-real-time?id=${id}`, assignment).toPromise();
  }
  getAllAssignments(email) {
    return this.http.get(`/internal/report/assign/get-all/assignments?incomingEmail=${email}`).toPromise();
  }
  approve(assignment, comment) {
    const approvalRequest = { assignment, comment };
    return this.http.put(`/internal/report/assign/fire-real-time/approve`, approvalRequest).toPromise();
  }
}

