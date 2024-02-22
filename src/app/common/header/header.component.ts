import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../service/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: any;
  notificationList: any = null;
  isNotificationDivVisible = false;
  constructor(public authService: AuthService,
              private router: Router,
              private notificationService: NotificationService,
              private route: ActivatedRoute) {
  }
  showOptions: any = false;
  isNotificationPage: any = false;
  ngOnInit() {
     this.authService.getCurrentUser().then(resp => {
       this.currentUser = resp;
       console.log(resp);
       this.getNotifications(this.currentUser.user.email);
    });
     this.route.url.subscribe(segments => {
      this.isNotificationPage = this.getUrlPosition('notification');
    });
     console.log('isNotificationPage', this.isNotificationPage);
  }
  redirectToNotification(notificationId) {
    if (this.isNotificationPage) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {id: notificationId},
        queryParamsHandling: 'merge',
      });
    }
    console.log(notificationId);
    this.router.navigate(['/notification'], { queryParams: { id: notificationId } });
  }
  async getNotifications(userEmail: string): Promise<void> {
    try {
      this.notificationList = await this.notificationService.getAllNotification(userEmail);
      console.log('Notifications:', this.notificationList);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigate([this.router.navigate([''])]);
  }
  changeLanguage(lang) {
  }
  getUrlPosition(url) {
    return this.router.url.includes(url);
  }
  isSeen(): boolean {
    return this.notificationList.some(notification => !notification.seen);
  }
  visible() {
    this.isNotificationDivVisible = !this.isNotificationDivVisible;
  }
}
