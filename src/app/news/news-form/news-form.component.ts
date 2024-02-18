import { Component, OnInit } from '@angular/core';
import {NewsService} from '../../service/news.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.css']
})
export class NewsFormComponent implements OnInit {
  newsList: any = null;

  constructor(private newsService: NewsService, private router: Router) { }

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

  deleteNews() {

  }

  goToEdit(item: any) {
    this.router.navigate(['admin/news/form/edit'], {
      queryParams: {
        newsId: item.id,
        create: false,
      },
      queryParamsHandling: 'merge'
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
}
