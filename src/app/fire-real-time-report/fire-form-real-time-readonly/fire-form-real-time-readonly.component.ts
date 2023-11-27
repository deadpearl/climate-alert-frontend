import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-fire-form-real-time-readonly',
  templateUrl: './fire-form-real-time-readonly.component.html',
  styleUrls: ['./fire-form-real-time-readonly.component.css']
})
export class FireFormRealTimeReadonlyComponent implements OnInit {
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
    return this.api.get(`/report/getById/fire-real-time?reportId=${reportId}`).toPromise();
  }

  saveForm() {
    console.log(this.formData);
    this.api.put('/report/edit-f1/fire-real-time', this.formData).subscribe(response => {
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
    return this.api.get(`/report/fire-real-time-overall?reportId=${reportId}&lang=${language}&type=${type}`,
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
