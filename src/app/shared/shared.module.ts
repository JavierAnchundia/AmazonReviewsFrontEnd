import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        SidebarComponent,
      
    ],
    declarations: [
        
    ],
    exports: [
        SidebarComponent,
      
    ],
  providers: [
   ],
})
export class SharedModule { }