import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {RealTimeReportService} from '../service/real-time-report.service';
import {AuthService} from '../service/auth.service';
import {UserService} from '../service/user.service';
import {ModalService} from '../service/modal.service';

@Component({
  selector: 'app-fire-real-time-report',
  templateUrl: './fire-real-time-report.component.html',
  styleUrls: ['./fire-real-time-report.component.css']
})
export class FireRealTimeReportComponent implements OnInit {
  constructor(private http: HttpClient,
              private router: Router,
              private rtReportService: RealTimeReportService,
              private authService: AuthService,
              private userService: UserService,
              private modalService: ModalService
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
  employeeId: any = 'defaultEmployeeValue';
  employeeList: any = null;
  monthId: any = 1;
  listFires: any = null;
  currentFire: any = false;
  currentUser: any = null;
  realTimeReportList: any = null;
  assignedValues: any = null;
  activeTab: any = 1;
  ngOnInit() {
    this.authService.getCurrentUser().then(resp => {
      this.currentUser = resp;
      console.log(this.currentUser);
      if (this.currentUser.user.role === 'ROLE_ADMIN') {
        this.userService.getRegisteredAdminEmployees(this.currentUser.user.email).then(response => {
          this.employeeList = response;
        });
      } else {
        this.rtReportService.getListEmployeesByEmployee(this.currentUser.user.email).then(response => {
          this.employeeList = response;
        });
      }
    });
  }
  isEditor() {
    return this.employeeId === this.currentUser.user.email;
  }

  getReportsByRTId(id) {
    this.rtReportService.getRTReportByRTDataId(id).then(resp => {
      this.realTimeReportList = resp;
    });
  }
  async getDocumentPreview() {
    this.reportPdf = await this.rtReportService.getRTReportPdf(this.currentFire.id, 'pdf', 'ru');
  }
  findFire() {
    console.log(this.yearId);
    console.log(this.monthId);
    this.currentFire = null;
    this.rtReportService.getRTReportSearch(this.yearId, this.monthId, this.employeeId).then((resp: any) => {
        this.listFires = resp;
      }
    );
    console.log(this.listFires);
  }
  goToReadOnly() {
    console.log('gotoreadonly');
    if (this.activeTab === 1) {
      if (this.currentUser.user.role === 'ROLE_ADMIN') {
        this.router.navigate(['admin/fire/report/real-time/form'], {
          queryParams: {
            reportId: this.currentFire.id,
            readonly: true,
          },
          queryParamsHandling: 'merge'
        });
      } else {
        this.router.navigate(['fire/report/real-time/form'], {
          queryParams: {
            reportId: this.currentFire.id,
            readonly: true,
          },
          queryParamsHandling: 'merge'
        });
      }
    } else {
      if (this.currentUser.user.role === 'ROLE_ADMIN') {
        this.router.navigate(['admin/fire/report/real-time-economic-damage/form'], {
          queryParams: {
            reportId: this.currentFire.economicDamageReport.id,
            readonly: true,
          },
          queryParamsHandling: 'merge'
        });
      } else {
        this.router.navigate(['fire/report/real-time-economic-damage/form'], {
          queryParams: {
            reportId: this.currentFire.economicDamageReport.id,
            readonly: true,
          },
          queryParamsHandling: 'merge'
        });
      }
    }
  }
  get listIsEmpty() {
    return this.listFires === false || this.listFires === null || Object.keys(this.listFires).length === 0;
  }
  goToEdit() {
    console.log('gotoreadonly');
    if (this.activeTab === 1) {
      this.router.navigate(['fire/report/real-time/form'], {
        queryParams: {
          reportId: this.currentFire.id,
          readonly: false,
        },
        queryParamsHandling: 'merge'
      });
    } else {
      this.router.navigate(['admin/fire/report/real-time-economic-damage/form'], {
        queryParams: {
          reportId: this.currentFire.economicDamageReport.id,
          readonly: false,
        },
        queryParamsHandling: 'merge'
      });
    }
  }

  selectEvent(item: any) {
    this.currentFire = item;
    console.log(this.currentFire);
  }
  activateTab(tabNumber: number): void {
    this.activeTab = tabNumber;
    if (this.activeTab === 2) {
      this.getRealTimeEconomicDocumentPreview();
    } else {
      this.getDocumentPreview();
    }
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
  async getRealTimeEconomicDocumentPreview() {
    this.reportPdf = null;
    this.reportPdf = await this.rtReportService.getRTEconomicReportPdf(this.currentFire.id, 'pdf', 'ru');
  }

  assign() {
    this.modalService.assignModal('Отправка на согласование', 'Заполните данные').then(
      (result) => {
        this.assignedValues = result;
        console.log(this.assignedValues);
        const assign = {
          id: this.currentFire.id,
          name: 'согласование',
          userIncoming: this.currentUser.user.email,
          userOutComing: this.assignedValues.admin,
          entityType: 'FireRealTimeReport',
          entityId: this.currentFire.id,
          shortContent: 'assign FireRealTimeReport',
          sentDateTime: new Date(),
          comment: this.assignedValues.comment,
          description: this.assignedValues.description,
          isSenderAdmin: this.currentUser.user.role === 'ROLE_ADMIN'
        };
        console.log(assign);
        this.rtReportService.assign(this.currentFire.id, assign).then(resp => {
          console.log(resp);
        });
      },
      (error) => {
        console.log('Modal dismissed with result:', error);
      }
    );
  }
}
