import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {RealTimeReportService} from '../service/real-time-report.service';
import {HttpClient} from '@angular/common/http';
import {ModalService} from '../service/modal.service';

@Component({
  selector: 'app-incoming-assign',
  templateUrl: './incoming-assign.component.html',
  styleUrls: ['./incoming-assign.component.css']
})
export class IncomingAssignComponent implements OnInit {

  assignmentList: any = null;
  currentUser: any = null;
  currentAssignment: any = false;
  reportPdf: Blob = null;
  comment: any = null;
  activeTab: any = 1;

  constructor(private authService: AuthService,  private router: Router,
              private realTimeReportService: RealTimeReportService, private http: HttpClient,
              private modalService: ModalService) { }

  async ngOnInit() {
    this.currentUser = await this.authService.getCurrentUser();
    console.log('thisfdasdf');
    console.log(this.currentUser.user.email);
    this.getAllAssignments(this.currentUser.user.email);
  }
  getAllAssignments(email) {
    this.realTimeReportService.getAllAssignments(email).then(resp => {
      this.assignmentList = resp;
      console.log(this.assignmentList);
    });
  }

  get listIsEmpty() {
    return this.assignmentList === false || this.assignmentList === null || Object.keys(this.assignmentList).length === 0;
  }
  formatDate(inputDate) {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');  // Добавляем 1, так как месяцы в JavaScript начинаются с 0
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
  selectEvent(item: any) {
    this.currentAssignment = item;
    console.log(this.currentAssignment);
  }
  async getDocumentPreview() {
    this.reportPdf = await this.realTimeReportService.getRTReportPdf(this.currentAssignment.entityId, 'pdf', 'ru');
  }
  activateTab(tabNumber: number): void {
    this.activeTab = tabNumber;
    if (this.activeTab === 2) {
      this.getRealTimeEconomicDocumentPreview();
    } else {
      this.getDocumentPreview();
    }
  }
  async getRealTimeEconomicDocumentPreview() {
    this.reportPdf = null;
    this.reportPdf = await this.realTimeReportService.getRTEconomicReportPdf(this.currentAssignment.entityId, 'pdf', 'ru');
  }
  editAssignment(item) {
    this.modalService.approveModal('Согласование', 'Заполните данные').then(
      (result) => {
        this.comment = result.comment;
        item.name = result.action;
        this.realTimeReportService.approve(item, this.comment).then(resp => {
          console.log(resp);
        });
      },
      (error) => {
        console.log('Modal dismissed with result:', error);
      }
    );
  }
}
