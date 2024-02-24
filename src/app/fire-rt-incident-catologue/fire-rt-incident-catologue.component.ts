import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {RealTimeReportService} from '../service/real-time-report.service';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-fire-rt-incident-catologue',
  templateUrl: './fire-rt-incident-catologue.component.html',
  styleUrls: ['./fire-rt-incident-catologue.component.scss']
})
export class FireRtIncidentCatologueComponent implements OnInit {

  constructor(private api: HttpClient, public modalService: NgbModal,
              private router: Router,
              private rtReportService: RealTimeReportService,
              private authService: AuthService) { }
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
  currentUser: any;
  activeTab: any = null;
  isAdmin: any = false;
  isEmployee: any = false;
  isUser: any = false;
  activateTab(tabNumber: number): void {
    this.activeTab = tabNumber;
  }
  async ngOnInit() {
    this.authService.getCurrentUser().then(resp => {
      this.currentUser = resp;
      console.log(resp);
      console.log(this.currentUser);
      if (this.currentUser.user.role === 'ROLE_ADMIN') {
        console.log('ROLE_ADMIN');
        this.isAdmin = true;
        this.activeTab = 1;
      } else if (this.currentUser.user.role === 'ROLE_EMPLOYEE') {
        console.log('ROLE_EMPLOYEE');
        this.isEmployee = true;
        this.activeTab = 2;
      } else {
        console.log('ROLE_user');
        this.activeTab = 5;
        this.isUser = true;
      }
    });
  }

  findFire() {
    console.log(this.yearId);
    console.log(this.monthId);
    if (this.currentUser.user.role === 'ROLE_ADMIN') {
      this.rtReportService.getRTDataSearch(this.yearId, this.monthId, null).
      then((resp: any) => {
          this.listFires = resp;
        }
      );
    } else {
      this.rtReportService.getRTDataSearch(this.yearId, this.monthId, this.currentUser.user.email).
      then((resp: any) => {
          this.listFires = resp;
        }
      );
    }
    console.log(this.listFires);
  }

  getFires(year, month) {
    return this.api.get(`/internal/api/data/RTData/search?year=${year}&month=${month}`);
  }

  get listIsEmpty() {
    return this.listFires === false || this.listFires === null || Object.keys(this.listFires).length === 0;
  }
  selectEvent(item: any) {
    this.currentFire = item;
    console.log(this.currentFire);
  }

  changeFire() {
    this.router.navigate(['admin/fire/real-time/catalogue/form'], {
      queryParams: {
        id: this.currentFire.id,
      },
      queryParamsHandling: 'merge'
    });
  }
}
