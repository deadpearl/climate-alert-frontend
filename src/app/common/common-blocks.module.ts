import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import { SideMenuComponent } from './side-menu/side-menu.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SideMenuComponent
  ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SideMenuComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [
  ]
})
export class CommonBlocksModule {}
