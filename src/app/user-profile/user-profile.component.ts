import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {ModalService} from '../service/modal.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  currentUser: any;
  constructor(public authService: AuthService,
              private router: Router,
              private modalService: ModalService) {
  }
  showOptions: any = false;
  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser);
  }
  getUrlPosition(url) {
    return this.router.url.includes(url);
  }
  openEditEmailModal() {
    this.modalService.openModal('Modal Title', 'Modal Content')
      .then(result => {
        console.log('Modal closed with result:', result);
      })
      .catch(error => {
        console.log('Modal dismissed with result:', error);
      });
  }

  formatDate(inputDate) {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');  // Добавляем 1, так как месяцы в JavaScript начинаются с 0
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  logout() {
    this.authService.logout();
  }
}
