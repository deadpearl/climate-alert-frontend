import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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
  getUrlPosition(url) {
    return this.router.url.includes(url);
  }
}
