import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../service/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-inner-header',
  templateUrl: './inner-header.component.html',
  styleUrls: ['./inner-header.component.css']
})
export class InnerHeaderComponent implements OnInit {
  currentUser: any;
  constructor(public authService: AuthService,
              private router: Router) {
  }
  showOptions: any = false;
  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser);
  }
  logout() {
    this.authService.logout();
    this.router.navigate([this.router.navigate([''])]);
  }
  changeLanguage(lang) {
  }

}
