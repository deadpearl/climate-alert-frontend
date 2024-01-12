import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {RealTimeReportService} from '../service/real-time-report.service';

@Component({
  selector: 'app-fire-real-time-report',
  templateUrl: './fire-real-time-report.component.html',
  styleUrls: ['./fire-real-time-report.component.css']
})
export class FireRealTimeReportComponent implements OnInit {
  constructor(private http: HttpClient,
              private router: Router,
              private rtReportService: RealTimeReportService
  ) { }
  reportPdf: Blob = null;
  years = [
    { value: 2020, label: '2020' },
    { value: 2021, label: '2021' },
    { value: 2022, label: '2022' },
    { value: 2023, label: '2023' },
    { value: 2024, label: '2024' }
  ];
  months = [
    { value: 1, label: 'Январь' },
    { value: 2, label: 'Февраль' },
    { value: 3, label: 'Март' },
    { value: 4, label: 'Апрель' },
    { value: 5, label: 'Май' },
    { value: 6, label: 'Июнь' },
    { value: 7, label: 'Июль' },
    { value: 8, label: 'Август' },
    { value: 9, label: 'Сентябрь' },
    { value: 10, label: 'Октябрь' },
    { value: 11, label: 'Ноябрь' },
    { value: 12, label: 'Декабрь' }
  ];
  yearId: any = 2024;
  monthId: any = 1;
  listFires: any = null;
  currentFire: any = false;
  ngOnInit() {
  }

  async getDocumentPreview() {
    this.reportPdf = await this.rtReportService.getRTReportPdf(this.currentFire.id, 'pdf', 'ru');
  }
  findFire() {
    console.log(this.yearId);
    console.log(this.monthId);
    this.rtReportService.getRTReportSearch(this.yearId, this.monthId).then((resp: any) => {
        this.listFires = resp;
      }
    );
    console.log(this.listFires);
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
  get listIsEmpty() {
    return this.listFires === false || this.listFires === null || Object.keys(this.listFires).length === 0;
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

  selectEvent(item: any) {
    this.currentFire = item;
    console.log(this.currentFire);
  }
}
