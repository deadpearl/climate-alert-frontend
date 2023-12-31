import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-fire-real-time-report',
  templateUrl: './fire-real-time-report.component.html',
  styleUrls: ['./fire-real-time-report.component.css']
})
export class FireRealTimeReportComponent implements OnInit {
  constructor(private http: HttpClient,
              private router: Router,
  ) { }
  reportPdf: Blob = null;
  ngOnInit() {
    this.getDocumentPreview();
  }

  async getDocumentPreview() {
    this.reportPdf = await this.getPDF(2, 'pdf', 'ru');
  }

  getPDF(requirementId, type = 'pdf', language =   'ru') {
    return this.http.get(`/report/fire-real-time-overall?reportId=${requirementId}&lang=${language}&type=${type}`,
      {responseType: 'blob'}).toPromise();
  }

  goToReadOnly() {
    console.log('gotoreadonly');
    this.router.navigate(['fire/report/real-time/form'], {
      queryParams: {
        reportId: 2,
        readonly: true,
      },
      queryParamsHandling: 'merge'
    });
  }

  goToEdit() {
    console.log('gotoreadonly');
    this.router.navigate(['fire/report/real-time/form'], {
      queryParams: {
        reportId: 2,
        readonly: false,
      },
      queryParamsHandling: 'merge'
    });
  }
}
