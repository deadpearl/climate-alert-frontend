import { Component, OnInit } from '@angular/core';
import {NewsService} from '../service/news.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  newsList: any = null;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getAll().then(resp => {
      this.newsList = resp;
    });
  }

  formatDate(inputDate) {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');  // Добавляем 1, так как месяцы в JavaScript начинаются с 0
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  goToNewItem(item: any) {
  }
}
