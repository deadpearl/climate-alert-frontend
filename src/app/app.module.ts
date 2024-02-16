import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import {CommonModule} from '@angular/common';
import {CommonBlocksModule} from './common/common-blocks.module';
import {AuthModule} from './auth/auth.module';
import {RouterModule} from '@angular/router';
import { FireRealTimeReportComponent } from './fire-real-time-report/fire-real-time-report.component';
import { CommonInternalTemplateComponent } from './common-internal-template/common-internal-template.component';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import {NgbModule, NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  FireFormRealTimeReadonlyComponent
} from './fire-real-time-report/fire-form-real-time-readonly/fire-form-real-time-readonly.component';
import { MapVisualComponent } from './map-visual/map-visual.component';
import { FireRtIncidentCatologueComponent } from './fire-rt-incident-catologue/fire-rt-incident-catologue.component';
import { FireRtIcFormComponent } from './fire-rt-incident-catologue/fire-rt-ic-form/fire-rt-ic-form.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './http-interceptors/auth-interceptor';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserManagementFormComponent } from './user-management/user-management-form/user-management-form.component';
import { UserProfileFormComponent } from './user-profile/user-profile-form/user-profile-form.component';
// tslint:disable-next-line:max-line-length
import { FireRealTimeEconomicDamageReportComponent } from './fire-real-time-economic-damage-report/fire-real-time-economic-damage-report.component';
// tslint:disable-next-line:max-line-length
import { FireRealTimeEconomicDamageReportFormComponent } from './fire-real-time-economic-damage-report/fire-real-time-economic-damage-report-form/fire-real-time-economic-damage-report-form.component';
import { ModalComponentComponent } from './modal-component/modal-component.component';
import { NewsComponent } from './news/news.component';
import { NewsFormComponent } from './news/news-form/news-form.component';
import { NewsEditComponent } from './news/news-form/news-edit/news-edit.component';
import { IncomingAssignComponent } from './incoming-assign/incoming-assign.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FireRealTimeReportComponent,
    CommonInternalTemplateComponent,
    FireFormRealTimeReadonlyComponent,
    MapVisualComponent,
    FireRtIncidentCatologueComponent,
    FireRtIcFormComponent,
    UserProfileComponent,
    UserManagementComponent,
    UserManagementFormComponent,
    UserProfileFormComponent,
    FireRealTimeEconomicDamageReportComponent,
    FireRealTimeEconomicDamageReportFormComponent,
    ModalComponentComponent,
    NewsComponent,
    NewsFormComponent,
    NewsEditComponent,
    IncomingAssignComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CommonModule,
        CommonBlocksModule,
        AuthModule,
        RouterModule,
        NgxExtendedPdfViewerModule,
        NgbTabsetModule,
        FormsModule,
      ReactiveFormsModule,
      NgbModule,
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalComponentComponent
  ],
})
export class AppModule { }
