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


const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'map',
    component: MapVisualComponent
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
        component: FireRealTimeReportComponent
      },
      {
        path: 'fire/report/real-time/form',
        component: FireFormRealTimeReadonlyComponent
      },
      {
        path: 'fire/real-time/catalogue',
        component: FireRtIncidentCatologueComponent
      },
      {
        path: 'admin/fire/real-time/catalogue',
        component: FireRtIncidentCatologueComponent
      },
      {
        path: 'admin/fire/real-time/catalogue/form',
        component: FireRtIcFormComponent
      },
      {
        path: 'user/profile',
        component: UserProfileComponent
      },
      {
        path: 'admin/user/profile',
        component: UserProfileComponent
      },
      {
        path: 'employee/user/profile',
        component: UserProfileComponent
      },
      {
        path: 'user/profile/form',
        component: UserProfileFormComponent
      },
      {
        path: 'admin/user/management',
        component: UserManagementComponent
      },
      {
        path: 'admin/user/management/form',
        component: UserManagementFormComponent
      },
      {
        path: 'fire/report/real-time-economic-damage',
        component: FireRealTimeEconomicDamageReportComponent
      },
      {
        path: 'fire/report/real-time-economic-damage/form',
        component: FireRealTimeEconomicDamageReportFormComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
