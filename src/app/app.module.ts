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
import {NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';
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
      ReactiveFormsModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
