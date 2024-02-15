import { Component, OnInit } from '@angular/core';
import {NewsService} from "../../service/news.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.css']
})
export class NewsFormComponent implements OnInit {
  newsList: any = null;

  constructor(private newsService: NewsService, private router: Router,) { }

  ngOnInit() {
    this.newsService.getAll().then(resp => {
      this.newsList = resp;
    });
  }

  addNews() {
    this.router.navigate(['admin/news/form/edit'], {
      queryParams: {
        create: true,
      },
      queryParamsHandling: 'merge'
    });
  }

  goToReadOnly() {
    console.log('gotoreadonly');
    this.router.navigate(['fire/report/real-time/form'], {
      queryParams: {
        reportId: 2,
        readonly: true,
      },
      queryParamsHandling: 'merge'
    });
  }

  deleteNews() {

  }
}
