import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  submenus = {
    analysis: false,
    planing: false,
    audits: false,
    modaeactivites: false,
    qualityControl: false,
    executionControl: false,
    analytics: false,
    conferences: false,
    planned_assessment: false,
    workControl: false,
    admin: false,
    estimate: false,
    training: false,
    assignmentControl: false,
    references: {
      assignments: false,
      audits: false,
      via: false,
      adminDela: false,
      other: false
    },
    skud: false,
    gosBudget: false,
    employeesAccounting: false
  };

  constructor(
    private router: Router,
  ) { }
  activeSubmenu: TemplateRef<any> = null;
  @ViewChild('divscroll', {read: ElementRef, static: false}) public panel: ElementRef<any>;
  ngOnInit() {
  }
  getUrlPosition(url) {
    return this.router.url.includes(url);
  }
  savePosition() {
    this.panel.nativeElement.scrollTop = Number(localStorage.getItem('position'));
  }


}
