import { Component, OnInit } from '@angular/core';
import {NewsService} from "../../service/news.service";

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.css']
})
export class NewsFormComponent implements OnInit {
  newsList: any = null;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getAll().then(resp => {
      this.newsList = resp;
    });
  }

  addNews() {

  }

  deleteNews() {

  }
}
