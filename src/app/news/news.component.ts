import { Component, OnInit } from '@angular/core';
import {NewsService} from "../service/news.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getAll().then(resp => {});
  }

}
