import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {NewsService} from "../../../service/news.service";

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private api: HttpClient, private router: Router,
              private newsService: NewsService) { }

  createAction = false;
  formData: any = {
     title: '',
     subtitle: '',
     text: '',
     imageUrl: ''
  };
  newsId: any;
  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.get('create') === 'true') {
        this.createAction = true;
      } else {
        this.createAction = false;
        this.newsId = +paramMap.get('newsId');
        this.getFormData(this.newsId);
      }
    });
  }
  saveForm() {

    console.log(this.formData)
    if (this.createAction === true) {
        this.newsService.createNews(this.formData).then(resp => {
          console.log('Success create', resp);
          this.router.navigate(['admin/news/form']);
        })
    }
    else {
        this.newsService.updateNews(this.newsId, this.formData).then(resp => {
          console.log('Success update', resp);
          this.router.navigate(['admin/news/form']);
        })
    }

  }

  back(){
    this.router.navigate(['admin/news/form']);
  }

  getFormData(id: any) {
    this.newsService.getOne(id).then(resp => {
      this.formData = resp;
      console.log(this.formData);
    });
  }


}
