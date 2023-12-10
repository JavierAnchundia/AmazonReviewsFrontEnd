import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DatePipe } from '@angular/common';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzDatePickerModule,
    NgApexchartsModule,
    
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    DatePipe,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
