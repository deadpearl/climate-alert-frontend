import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-user-management-form',
  templateUrl: './user-management-form.component.html',
  styleUrls: ['./user-management-form.component.scss']
})
export class UserManagementFormComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private userService: UserService) { }
  userId: any = null;
  action: any = '';
  createFormData: any = {
    id: null,
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    role: 'ROLE_USER',
    password: '',
    phoneNumber: '',
    birthDate: '',
    city: ''
  };
  updateFormData: any = null;
  adminUserId: any = null;
  userEmployeeRoleList: any = null;
  adminEmployeeList: any = [];
  adminEmail: any = null;
  roles = [
    {
      nameRu: 'Пользователь',
      name: 'ROLE_USER'
    },
    {
      nameRu: 'Сотрудник',
      name: 'ROLE_EMPLOYEE'
    },
    {
      nameRu: 'Админ(Сотрудник)',
      name: 'ROLE_ADMIN'
    },
  ];
  currentEmployee: any = null;

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.userId = +paramMap.get('id');
      this.adminUserId = +paramMap.get('adminUserId');
      this.action = paramMap.get('action');
    });
    if (this.userId !== 0) {
      this.getUser(this.userId);
    }
    if (this.adminUserId !== 0) {
      this.getAllUserRoles();
      this.getUser(this.adminUserId);
    }
  }
  getRegisteredEmployees(email) {
    this.userService.getRegisteredAdminEmployees(email).then(resp => {
      this.adminEmployeeList = resp;
      console.log(this.adminEmployeeList);
    });
  }
  getAllUserRoles() {
    this.userService.getAllUserEmployee().then(resp => {
      this.userEmployeeRoleList = resp;
    });
  }

  goBack() {
  }
  getUser(id) {
    this.userService.getUserById(id).then(resp => {
      this.updateFormData = resp;
      this.getRegisteredEmployees(this.updateFormData.email);
    });
  }

  createUser() {
    console.log(this.createFormData);
    this.userService.updateUser(this.createFormData).then(resp => {
      console.log(resp);
      this.router.navigate(['user/management']);
    });
  }
  updateUser() {
    console.log(this.updateFormData);
    this.userService.updateUser(this.updateFormData).then(resp => {
      console.log(resp);
      this.router.navigate(['user/management']);
    });
  }

  addAdminEmployee() {
    this.adminEmployeeList.push(this.currentEmployee);
    this.userEmployeeRoleList = this.userEmployeeRoleList.filter(employee => employee !== this.currentEmployee);
    console.log(this.adminEmployeeList);
  }

  selectEvent(item: any) {
    if (this.currentEmployee === item) {
      this.currentEmployee = null;
    } else {
      this.currentEmployee = item;
    }
  }

  saveAdminEmployee() {
    const newEmployeeList = this.adminEmployeeList.map(adminEmployee => ({
      firstName: adminEmployee.firstName,
      lastName: adminEmployee.lastName,
      email: adminEmployee.email ? adminEmployee.email : adminEmployee.employeeEmail
    }));
    const obj = {
      adminEmail: this.updateFormData.email,
      employees: newEmployeeList
    };
    console.log(obj);
    this.userService.registerEmployees(obj).then(resp => {
      console.log(resp);
    });
  }
}
