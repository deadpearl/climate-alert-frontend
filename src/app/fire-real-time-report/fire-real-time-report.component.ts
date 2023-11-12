import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-fire-real-time-report',
  templateUrl: './fire-real-time-report.component.html',
  styleUrls: ['./fire-real-time-report.component.css']
})
export class FireRealTimeReportComponent implements OnInit {
  constructor(private http: HttpClient
  ) { }
  reportPdf: any = null;
  ngOnInit() {
    this.getDocumentPreview();
  }

  async getDocumentPreview() {
    this.reportPdf = await this.getPDF(1, 'pdf', 'ru');
  }

  getPDF(requirementId, type = 'pdf', language = 'ru') {
    return this.http.get(`/report//fire-real-time-overall?reportId=${requirementId}&lang=${language}&type=${type}`,
      {responseType: 'blob'}).toPromise();
  }

}
