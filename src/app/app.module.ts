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
import { FireFormRealTimeReadonlyComponent } from './fire-real-time-report/fire-form-real-time-readonly/fire-form-real-time-readonly.component';
import {NgbTabsetModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FireRealTimeReportComponent,
    CommonInternalTemplateComponent,
    FireFormRealTimeReadonlyComponent,
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
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
