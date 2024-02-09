import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-common-internal-template',
  templateUrl: './common-internal-template.component.html',
  styleUrls: ['./common-internal-template.component.css']
})
export class CommonInternalTemplateComponent implements OnInit {

  currentUser: any;
  constructor(public authService: AuthService,
              private router: Router) {
  }
  showOptions: any = false;
  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser);
  }
  getUrlPosition(url) {
    return this.router.url.includes(url);
  }
}
