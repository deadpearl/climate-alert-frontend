import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {RealTimeReportService} from '../../service/real-time-report.service';
import {UserService} from '../../service/user.service';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-fire-rt-ic-form',
  templateUrl: './fire-rt-ic-form.component.html',
  styleUrls: ['./fire-rt-ic-form.component.css']
})
export class FireRtIcFormComponent implements OnInit {
  fireId: any;
  catalogueData: any = null;
  reportRTPdf: Blob = null;
  reportEconomicPdf: Blob = null;
  showPreviewTab = false;
  editTab = true;
  realTimeReportList: any = null;
  createButtonTouched: any = 0;
  selectEditorEmail: any = '';
  editors: any = [];
  editorsPostData: any = [];
  editorsForm: any = [];
  currentRealTimeFire: boolean;
  currentUser: any = null;
  currentReport: any = false;
  activeTab: any = 1;
  activateTab(tabNumber: number): void {
    this.activeTab = tabNumber;
    if (this.activeTab === 2) {
      this.getRealTimeEconomicDocumentPreview();
    } else {
      this.getRealTimeDocumentPreview();
    }

  }
  constructor(private activatedRoute: ActivatedRoute, private api: HttpClient, private router: Router,
              private rtReportService: RealTimeReportService, private userService: UserService,
              private authService: AuthService) { }

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
    this.authService.getCurrentUser().then(resp => {
      this.currentUser = resp;
      this.userService.getRegisteredAdminEmployees(this.currentUser.user.email).then(resps => {
        this.editors = resps;
      });
    });
  }

  addEditor() {
    const selectedEditor = this.editors.find(editor => editor.employeeEmail === this.selectEditorEmail);
    console.log('selectedEditor', selectedEditor);
    console.log('editors', this.editors);
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
    this.createButtonTouched = 0;
    this.getCatalogueRTFire(this.fireId);
    this.getReportsByRTId(this.fireId);
  }
  formatRegisterDate(inputDate) {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');  // Добавляем 1, так как месяцы в JavaScript начинаются с 0
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
  selectEvent(item: any) {
    this.currentReport = item;
    console.log(this.currentReport);
    this.getRealTimeDocumentPreview();
  }
  async getRealTimeDocumentPreview() {
    this.reportRTPdf = await this.rtReportService.getRTReportPdf(this.currentReport.id, 'pdf', 'ru');
  }
  async getRealTimeEconomicDocumentPreview() {
    this.reportRTPdf = null;
    this.reportRTPdf = await this.rtReportService.getRTEconomicReportPdf(this.currentReport.id, 'pdf', 'ru');
  }
  cancelCreatingReport() {
    this.createButtonTouched = 0;
  }

  deleteEditor(index: number) {
    this.editorsPostData.splice(index, 1);

    this.editorsForm.splice(index, 1);
  }
}
