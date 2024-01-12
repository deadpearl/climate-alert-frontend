import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {RealTimeReportService} from '../../service/real-time-report.service';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-fire-rt-ic-form',
  templateUrl: './fire-rt-ic-form.component.html',
  styleUrls: ['./fire-rt-ic-form.component.css']
})
export class FireRtIcFormComponent implements OnInit {
  fireId: any;
  catalogueData: any = null;
  reportPdf: Blob = null;
  showPreviewTab = false;
  editTab = true;
  realTimeReportList: any = null;
  createButtonTouched: any = 0;
  selectEditorEmail: any = '';
  editors: any = [[]];
  editorsPostData: any = [];
  editorsForm: any = [[]];
  currentRealTimeFire: boolean;
  constructor(private activatedRoute: ActivatedRoute, private api: HttpClient, private router: Router,
              private rtReportService: RealTimeReportService, private userService: UserService) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.fireId = +paramMap.get('id');
    });
    console.log(this.fireId);
    this.getCatalogueRTFire(this.fireId);
    this.getReportsByRTId(this.fireId);
  }
  getCatalogueRTFire(id: any) {
    this.rtReportService.getCatalogueFireById(id).then(resp => {
      this.catalogueData = resp;
      console.log(this.catalogueData);
    });
  }

  getReportsByRTId(id) {
    this.rtReportService.getRTReportByRTDataId(id).then(resp => {
      this.realTimeReportList = resp;
    });
  }

  buttonCreateReport() {
    this.createButtonTouched = 1;
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllUsers().then(resp => {
      this.editors = resp;
    });
  }

  addEditor() {
    const selectedEditor = this.editors.find(editor => editor.email === this.selectEditorEmail);
    const newEditor = {
      email: this.selectEditorEmail,
      reportId: this.fireId,
    };
    this.editorsPostData.push(newEditor);
    console.log(this.editorsPostData);
    const editorForloop = {
      firstName: selectedEditor.firstName,
      lastName: selectedEditor.lastName
    };
    this.editorsForm.push(editorForloop);
    this.selectEditorEmail = null;
  }

  createReport() {
    const data = {
      startDate: this.catalogueData.acqDate,
      latitude: this.catalogueData.latitude,
      longitude: this.catalogueData.longitude,
      editors: this.editorsPostData,
      fireRTDataId: this.fireId
    };
    this.rtReportService.createNewReport(data).then(resp => {});
  }

  selectEvent(item: any) {

  }
}
