import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main/main.component';
import {FireRealTimeReportComponent} from './fire-real-time-report/fire-real-time-report.component';
import {CommonInternalTemplateComponent} from './common-internal-template/common-internal-template.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
