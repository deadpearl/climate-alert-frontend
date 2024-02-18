import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-fire-real-time-economic-damage-report-form',
  templateUrl: './fire-real-time-economic-damage-report-form.component.html',
  styleUrls: ['./fire-real-time-economic-damage-report-form.component.css']
})
export class FireRealTimeEconomicDamageReportFormComponent implements OnInit {

  constructor( private activatedRoute: ActivatedRoute, private api: HttpClient, private router: Router) { }
  reportId: any;
  readonly = false;
  formData: any = null;
  reportPdf: Blob = null;
  showPreviewTab = false;
  editTab = true;

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.reportId = +paramMap.get('reportId');
      if (paramMap.get('readonly') === 'true') {
        this.readonly = true;
      }
    });
    console.log(this.reportId + ' ' + this.readonly);
    this.getFormData(this.reportId);
  }

  getFormData(reportId: any) {
    this.form(reportId).then(resp => {
      this.formData = resp;
      console.log(this.formData);
    });
  }
  form(reportId: any) {
    return this.api.get(`/internal/report/get-one/economic-damage?reportId=${reportId}`).toPromise();
  }

  saveForm() {
    console.log(this.formData);
    this.api.put('/internal/report/edit-f2/fire-real-time', this.formData).subscribe(response => {
      // Обработка успешного ответа от сервера
      console.log('Success', response);
    }, error => {
      // Обработка ошибки
      console.error('Error', error);
    });
  }

  async getReportPdf() {
    this.editTab = false;
    this.showPreviewTab = true;
    this.reportPdf = await this.getPDF(this.reportId, 'pdf', 'ru');
  }

  getPDF(reportId, type = 'pdf', language =   'ru') {
    return this.api.get(`/internal/report/fire-real-time-economic-damage?reportId=${reportId}&lang=${language}&type=${type}`,
      {responseType: 'blob'}).toPromise();
  }

  switchOnEditTab() {
    this.editTab = true;
    this.showPreviewTab = false;
  }

  goBack() {
    this.router.navigate(['fire/report/real-time']);
  }

}
