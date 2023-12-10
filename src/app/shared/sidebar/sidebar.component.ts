import { Component, OnInit, OnDestroy } from '@angular/core';


import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { getISOWeek } from 'date-fns';
import {ReviewsService} from "../../services/reviews.service"
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [ ReactiveFormsModule,NgFor, NgIf,NzDatePickerModule, FormsModule,DatePipe],
  standalone: true,


})
export class SidebarComponent  implements OnInit, OnDestroy{


  imPostulante:boolean = true;
  
  datePipeStringStart : string;
  datePipeStringEnd : string;

  pressedSideBar = false;
  pressedProfile = false;
  isAdmin = true;


  private navBarServiceSubscription: Subscription | undefined;


  
  postulanteForm = new FormGroup({
    rangeDate: new FormControl(''),
    movieCode: new FormControl(''),
    userName: new FormControl(''),
   
  });
  constructor(private i18n: NzI18nService, private _servicio: ReviewsService, private datePipe: DatePipe)
  {

    
  }
  
  ngOnInit(): void 
  {

    //Esta parte permite que se envie el valor que se esta modificando al navbar y pueda cambiar los labeles y botones correspondientes
   
  }


  onClickedProfile()
  {
    this.pressedProfile =  !this.pressedProfile;

  }

  onClickedMenu()
  {
    this.pressedSideBar =  !this.pressedSideBar;

  }

  getReviews(){
    const reviewsParams = new FormData();


   


    if(this.postulanteForm.value.rangeDate != null && this.postulanteForm.value.rangeDate.length != 0)
    {
      let dateStringFrom = ""
      let dateStringTo = ""


      this.datePipeStringStart = this.datePipe.transform((this.postulanteForm.value.rangeDate[0] as Object as Date),'yyyy-MM-dd');
      this.datePipeStringEnd = this.datePipe.transform((this.postulanteForm.value.rangeDate[1] as Object as Date),'yyyy-MM-dd');


      this._servicio.set_date_start(this.datePipeStringStart);
      this._servicio.set_date_end(this.datePipeStringEnd);
      this._servicio.set_dateFilterOn("True");
     

    }

    else
    {
      this._servicio.set_date_start("");
      this._servicio.set_date_end("");
      this._servicio.set_dateFilterOn("False");

    }

    if(this.postulanteForm.value.movieCode != null && this.postulanteForm.value.movieCode != "")
    {
      this._servicio.set_movieCode(this.postulanteForm.value.movieCode);
      this._servicio.set_movieCodeFilterOn("True");

    }

    else
    {
      this._servicio.set_movieCode("");
      this._servicio.set_movieCodeFilterOn("False");

    }

    if(this.postulanteForm.value.userName != null && this.postulanteForm.value.userName != "")
    {
      this._servicio.set_userNameList(this.postulanteForm.value.userName + ",");
      this._servicio.set_userNameFilterOn("True");

    }

    else
    {
      this._servicio.set_userNameList("");
      this._servicio.set_userNameFilterOn("False");

    }

    


  

    reviewsParams.append('date_start',this._servicio.get_date_start());
    reviewsParams.append('date_end',this._servicio.get_date_end());
    reviewsParams.append('movieCode', this._servicio.get_movieCode());
    reviewsParams.append('userNameList', this._servicio.get_userNameList());

    reviewsParams.append('dateFilterOn',this._servicio.get_dateFilterOn());
    reviewsParams.append('movieCodeFilterOn', this._servicio.get_movieCodeFilterOn());
    reviewsParams.append('userNameFilterOn', this._servicio.get_userNameFilterOn());
    reviewsParams.append('mainQueryOn', this._servicio.get_mainQueryOn());
    reviewsParams.append('Top10BestScoreOn',this._servicio.get_Top10BestScoreOn());
    reviewsParams.append('Top10WorstScoreOn', this._servicio.get_Top10WorstScoreOn());

    
    this._servicio.getReviewsData(reviewsParams).subscribe((data:any) => {

      this._servicio.setReview(data.mainInfo );
      this._servicio.setReviewMax(data.maxScore );
      this._servicio.setReviewMin(data.minScore );
      this._servicio.setReviewProm(data.promScore );
      this._servicio.setReviewCount(  data.numberOfUsers);

        /*this.id_camposanto = data['id_camposanto']
        this.postCoordenadas();
        let lenCadena = String(this.redList.value[0].redSocial);
        if(this.redList.length>0 || lenCadena.length>0){
          this.postRedesSociales();
        }*/
    })
}

  onPressedAdministrarProductos() 
  {
    this.pressedSideBar =  !this.pressedSideBar;

  }


  onPressedPostularProveedor() 
  {
    this.imPostulante = true;

    if(this.pressedSideBar)
    {
      this.pressedSideBar =  !this.pressedSideBar;

    }

  }

  onPressedBuscarServicio()
  {
    this.imPostulante = false;

    if(this.pressedSideBar)
    {
      this.pressedSideBar =  !this.pressedSideBar;

    }

  }
  onPressedAdministrarPostulantes() 
  {
          this.pressedSideBar =  !this.pressedSideBar;

  }


  ngOnDestroy(): void {
    this.navBarServiceSubscription?.unsubscribe();
  }
  

  date = null;

  onChange(result: Date[]): void {
  }

  getWeek(result: Date[]): void {
  }














}



