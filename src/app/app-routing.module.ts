import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [ {
  path: 'AmazonReviews',
  component: PagesComponent,
  children: 
  [
    
    {
      path: 'Dashboard',
      component: DashboardComponent
    },

    {path: '', pathMatch: 'full', redirectTo: 'Dashboard'}  

  ]
},
{path: '', pathMatch: 'full', redirectTo: 'AmazonReviews'}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
