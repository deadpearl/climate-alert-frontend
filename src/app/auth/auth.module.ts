import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CommonBlocksModule} from '../common/common-blocks.module';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [AuthComponent, LoginComponent, SignupComponent],
  exports: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    FormsModule,
    CommonBlocksModule,
    HttpClientModule
  ]
})
export class AuthModule {}
