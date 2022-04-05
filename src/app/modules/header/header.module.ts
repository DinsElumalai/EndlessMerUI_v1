import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { ToggleSidebarModule } from '../toggle-sidebar/toggle-sidebar.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ToggleSidebarModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
  ]
})
export class HeaderModule { 

 

}
