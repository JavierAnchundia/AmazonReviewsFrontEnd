import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { HttpClientModule } from '@angular/common/http';

import { FormGroup, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './dashboard/dashboard.component';

registerLocaleData(es);


@NgModule({
    declarations: [
      
    
    
  
   
  
    DashboardComponent
  ],
    exports: [
      
    ],
    imports: [
        CommonModule,
        SharedModule,
      
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        
        FormGroup,
        FormControl,
        BrowserModule,
    ],
    providers: [
        ],
})
export class PagesModule { }