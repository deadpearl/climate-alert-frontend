import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main/main.component';
import {FireRealTimeReportComponent} from './fire-real-time-report/fire-real-time-report.component';
import {CommonInternalTemplateComponent} from './common-internal-template/common-internal-template.component';
import {
  FireFormRealTimeReadonlyComponent
} from './fire-real-time-report/fire-form-real-time-readonly/fire-form-real-time-readonly.component';
import {MapVisualComponent} from './map-visual/map-visual.component';
import {FireRtIncidentCatologueComponent} from './fire-rt-incident-catologue/fire-rt-incident-catologue.component';
import {FireRtIcFormComponent} from './fire-rt-incident-catologue/fire-rt-ic-form/fire-rt-ic-form.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {UserProfileFormComponent} from './user-profile/user-profile-form/user-profile-form.component';
import {UserManagementComponent} from './user-management/user-management.component';
import {UserManagementFormComponent} from './user-management/user-management-form/user-management-form.component';
import {
  FireRealTimeEconomicDamageReportComponent
} from './fire-real-time-economic-damage-report/fire-real-time-economic-damage-report.component';
import {
  FireRealTimeEconomicDamageReportFormComponent
// tslint:disable-next-line:max-line-length
} from './fire-real-time-economic-damage-report/fire-real-time-economic-damage-report-form/fire-real-time-economic-damage-report-form.component';
import {NewsFormComponent} from './news/news-form/news-form.component';
import {NewsComponent} from './news/news.component';
import {NewsEditComponent} from './news/news-form/news-edit/news-edit.component';
import {AuthGuard} from './service/auth.guard';
import {NewsItemComponent} from "./news/news-item/news-item.component";
import {NotificationComponent} from "./notification/notification.component";


const routes: Routes = [
  {
    path: '',
    component: MainComponent, canActivate: [AuthGuard], data: { requiresAuth: false }
  },
  {
    path: 'map',
    component: MapVisualComponent, canActivate: [AuthGuard], data: { requiresAuth: false }
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((mod) => mod.AuthModule),
  },
  {
    path: '',
    component: CommonInternalTemplateComponent,
    children: [
      {
        path: 'fire/report/real-time',
        component: FireRealTimeReportComponent, canActivate: [AuthGuard], data: { requiresAuth: true }
      },
      {
        path: 'admin/fire/report/real-time',
        component: FireRealTimeReportComponent, canActivate: [AuthGuard], data: { requiresAuth: true }
      },
      {
        path: 'fire/report/real-time/form',
        component: FireFormRealTimeReadonlyComponent, canActivate: [AuthGuard], data: { requiresAuth: true }
      },
      {
        path: 'admin/fire/report/real-time/form',
        component: FireFormRealTimeReadonlyComponent, canActivate: [AuthGuard], data: { requiresAuth: true }
      },
      {
        path: 'fire/real-time/catalogue',
        component: FireRtIncidentCatologueComponent, canActivate: [AuthGuard], data: { requiresAuth: true }
      },
      {
        path: 'admin/fire/real-time/catalogue',
        component: FireRtIncidentCatologueComponent, canActivate: [AuthGuard], data: { requiresAuth: true }
      },
      {
        path: 'admin/fire/real-time/catalogue/form',
        component: FireRtIcFormComponent, canActivate: [AuthGuard], data: { requiresAuth: true }
      },
      {
        path: 'user/profile',
        component: UserProfileComponent, canActivate: [AuthGuard], data: { requiresAuth: true }
      },
      {
        path: 'admin/user/profile',
        component: UserProfileComponent, canActivate: [AuthGuard], data: { requiresAuth: true }
      },
      {
        path: 'employee/user/profile',
        component: UserProfileComponent, canActivate: [AuthGuard], data: { requiresAuth: true }
      },
      {
        path: 'user/profile/form',
        component: UserProfileFormComponent, canActivate: [AuthGuard], data: { requiresAuth: true }
      },
      {
        path: 'admin/user/management',
        component: UserManagementComponent, canActivate: [AuthGuard], data: { requiresAuth: true }
      },
      {
        path: 'admin/user/management/form',
        component: UserManagementFormComponent, canActivate: [AuthGuard], data: { requiresAuth: true }
      },
      {
        path: 'admin/news/form',
        component: NewsFormComponent, canActivate: [AuthGuard], data: { requiresAuth: true }
      },
      {
        path: 'admin/news/form/edit',
        component: NewsEditComponent, canActivate: [AuthGuard], data: { requiresAuth: true }
      },
      {
        path: 'news',
        component: NewsComponent, canActivate: [AuthGuard], data: { requiresAuth: false }
      },
      {
        path: 'news/item',
        component: NewsItemComponent, canActivate: [AuthGuard], data: { requiresAuth: false }
      },
      {
        path: 'notification',
        component: NotificationComponent, canActivate: [AuthGuard], data: { requiresAuth: true }
      },
      {
        path: 'fire/report/real-time-economic-damage',
        component: FireRealTimeEconomicDamageReportComponent, canActivate: [AuthGuard], data: { requiresAuth: true }
      },
      {
        path: 'fire/report/real-time-economic-damage/form',
        component: FireRealTimeEconomicDamageReportFormComponent, canActivate: [AuthGuard], data: { requiresAuth: true }
      },
      {
        path: 'admin/fire/report/real-time-economic-damage',
        component: FireRealTimeEconomicDamageReportComponent, canActivate: [AuthGuard], data: { requiresAuth: true }
      },
      {
        path: 'admin/fire/report/real-time-economic-damage/form',
        component: FireRealTimeEconomicDamageReportFormComponent, canActivate: [AuthGuard], data: { requiresAuth: true }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
