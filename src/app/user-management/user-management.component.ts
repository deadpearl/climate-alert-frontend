import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  usersList: any = null;
  currentUser: any = false;

  constructor(private userService: UserService,  private router: Router, ) { }

  ngOnInit() {
    this.getAllUsers();
  }
  getAllUsers() {
    this.userService.getAllUsers().then(resp => {
      this.usersList = resp;
    });
  }

  get listIsEmpty() {
    return this.usersList === false || this.usersList === null || Object.keys(this.usersList).length === 0;
  }



  selectEvent(item: any) {
    if (this.currentUser === item) {
      this.currentUser = null;
    } else {
      this.currentUser = item;
    }
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


  changeUser() {
    this.router.navigate(['admin/user/management/form'], {
      queryParams: {
        id: this.currentUser.id,
        action: 'update'
      },
      queryParamsHandling: 'merge'
    });
  }
  addUser() {
    this.router.navigate(['admin/user/management/form'], {
      queryParams: {
        action: 'create'
      },
      queryParamsHandling: 'merge'
    });
  }

  addEmployeeToAdmin() {
    this.router.navigate(['admin/user/management/form'], {
      queryParams: {
        action: 'addEmployee',
        adminUserId: this.currentUser.id
      },
      queryParamsHandling: 'merge'
    });
  }
}
