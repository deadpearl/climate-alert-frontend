import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {NotificationService} from '../service/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notification: any = null;
  notificationId: any = null;
  notificationType: any = null;
  constructor(private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.notificationId = paramMap.get('id');
      this.notificationType = paramMap.get('type');
      this.notificationService.getOne(this.notificationId, this.notificationType).then(resp => {
        this.notification = resp;
      });
    });
    console.log(this.notificationId);
    console.log(this.notificationType);
  }

}
