import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-fire-form-real-time-readonly',
  templateUrl: './fire-form-real-time-readonly.component.html',
  styleUrls: ['./fire-form-real-time-readonly.component.css']
})
export class FireFormRealTimeReadonlyComponent implements OnInit {
  constructor( private activatedRoute: ActivatedRoute, private api: HttpClient) { }
  reportId: any;
  readonly: any;
  formData: any = null;

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.reportId = +paramMap.get('reportId');
      this.readonly = paramMap.get('readonly');
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

}
