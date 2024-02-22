import { Component, OnInit } from '@angular/core';
import {NewsService} from '../../service/news.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent implements OnInit {
  newItem: any = null;
  newId: any = null;

  constructor(private newsService: NewsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.newId = paramMap.get('id');
    });
    this.newsService.getOne(this.newId).then(resp => {
      this.newItem = resp;
    });
  }

}
