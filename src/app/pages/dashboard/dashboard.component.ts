import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexChart,
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexMarkers,
  ApexAnnotations,
  ApexStroke
} from "ng-apexcharts";

import {NgApexchartsModule} from "ng-apexcharts"
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { getISOWeek } from 'date-fns';
import { datas } from "./series-data";
import {Reviews} from "../../models/reviews.model"
import {ReviewsService} from "../../services/reviews.service"

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  annotations: ApexAnnotations;
  colors: any;
  toolbar: any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [ ReactiveFormsModule,NgFor, NgIf,NzDatePickerModule, FormsModule,NgApexchartsModule],
})
export class DashboardComponent implements OnInit{

  @ViewChild("chart", { static: false }) chart: ChartComponent;
  @ViewChild("chart2", { static: false }) chart2: ChartComponent;

  public chartOptions: Partial<ChartOptions>;
  public activeOptionButton = "all";

  columnsNames: String[] = [];
  cantidadUsuarios: number = 0;
  minScoreValue: number = 0;
  maxScoreValue: number = 0;
  promScoreValue: number = 0;
  datostbShow: Reviews[] = []
  datosGraficatimeHelpFullNess: any; 
  datosGraficatimeScore: any; 

  private reviewServiceSubscription: Subscription | undefined;
  private reviewServiceMaxSubscription: Subscription | undefined;
  private reviewServiceMinSubscription: Subscription | undefined;
  private reviewServicePromSubscription: Subscription | undefined;
  private reviewServiceCountSubscription: Subscription | undefined;


  

  
  constructor(private _servicio: ReviewsService) {
   
    this.reviewServiceSubscription = this._servicio.imReview.subscribe(
      data => {
        this.datostbShow = data;
      }
    );

    this.reviewServiceMaxSubscription = this._servicio.imReviewMax.subscribe(
      data => {
        this.maxScoreValue = data;
      }
    );

    this.reviewServiceMinSubscription = this._servicio.imReviewMin.subscribe(
      data => {
        this.minScoreValue = data;
      }
    );

    this.reviewServicePromSubscription = this._servicio.imReviewProm.subscribe(
      data => {
        this.promScoreValue = data;
      }
    );

    this.reviewServiceCountSubscription = this._servicio.imReviewCount.subscribe(
      data => {
        this.cantidadUsuarios = data;
      }
    );
    this.onClickVer200();

    this.columnsNames = [
      "Código de la Película", "Id de Usuario", "Nombre del Perfil", "Utilidad", "Puntaje", "Fecha", "Resumen", "Texto"];


    
      
    
    this.chartOptions = {
      series: [
        {
         
          data: []

          
          
        }
      ],
      chart: {
        type: "area",
        height: 350
      },
      annotations: {
        yaxis: [
          {
            y: 30,
            borderColor: "#999",
            label: {
              text: "Support",
              style: {
                color: "#fff",
                background: "#00E396"
              }
            }
          }
        ],
        xaxis: [
          {
            x:  new Date("14 Nov 2006").getTime(),
            borderColor: "#999",
            label: {
              text: "Rally",
              style: {
                color: "#fff",
                background: "#775DD0"
              }
            }
          }
        ]
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: "datetime",
        min: new Date("01 Mar 2006").getTime(),
        tickAmount: 6
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy"
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100]
        }
      }
    };  }


    ngOnInit(): void {

     
      
    }


  onClickVer200()
  {
    this._servicio.set_mainQueryOn("True");
    this._servicio.set_Top10BestScoreOn("False");
    this._servicio.set_Top10WorstScoreOn("False");

    this.getReviews();
  }

  onClickTop10Peores()
  {
    this._servicio.set_mainQueryOn("False");
    this._servicio.set_Top10BestScoreOn("False");
    this._servicio.set_Top10WorstScoreOn("True");
    this.getReviews();

  }

  onClickTop10Mejores()
  {
    this._servicio.set_mainQueryOn("False");
    this._servicio.set_Top10BestScoreOn("True");
    this._servicio.set_Top10WorstScoreOn("False");
    this.getReviews();

  }

  getReviews(){
      const reviewsParams = new FormData();

      
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
          this.datostbShow = data.mainInfo;
          this.cantidadUsuarios = data.numberOfUsers;
          this.minScoreValue  = data.minScore;
          this.maxScoreValue  = data.maxScore;
          this.promScoreValue = data.promScore;

          this.datosGraficatimeHelpFullNess = data.timeHelpFullNess as Array<Array<number>>;
          this.datosGraficatimeScore = data.timeScore as Array<Array<number>>;

          

          let convertedDataHelpFullNess = this.datosGraficatimeHelpFullNess.map((tupla) =>  [Number(tupla[0]),Number(tupla[1])]);
          let convertedDataScore = this.datosGraficatimeScore.map((tupla) =>  [Number(tupla[0]),Number(tupla[1])]);


          let sortedDataHelpFullNess = convertedDataHelpFullNess.sort(function(a, b){
            return a[0] - b[0]; // sort in descending order
        });

          let sortedDataScore = convertedDataScore.sort(function(a, b){
            return a[0] - b[0]; // sort in descending order
        });

         

          
          this.chart.updateOptions({
            series: [
              {
               
                data: sortedDataScore
      
                
                
              }
            ],
          })

          this.chart2.updateOptions({
            series: [
              {
                
                data: sortedDataHelpFullNess
      
                
                
              }
            ],
          })


          


          /*this.id_camposanto = data['id_camposanto']
          this.postCoordenadas();
          let lenCadena = String(this.redList.value[0].redSocial);
          if(this.redList.length>0 || lenCadena.length>0){
            this.postRedesSociales();
          }*/
      })
  }
  
    public updateOptionsData = {
      "1m": {
        xaxis: {
          min: new Date("28 Jan 2013").getTime(),
          max: new Date("27 Feb 2013").getTime()
        }
      },
      "6m": {
        xaxis: {
          min: new Date("27 Sep 2012").getTime(),
          max: new Date("27 Feb 2013").getTime()
        }
      },
      "1y": {
        xaxis: {
          min: new Date("27 Feb 2012").getTime(),
          max: new Date("27 Feb 2013").getTime()
        }
      },
      "1yd": {
        xaxis: {
          min: new Date("01 Jan 2013").getTime(),
          max: new Date("27 Feb 2013").getTime()
        }
      },
      all: {
        xaxis: {
          min: undefined,
          max: undefined
        }
      }
    };
  
  
  dateConvert(time:number)
  {
  
      return new Date(time)
  }   
  
  initChart(): void {
    
  }

  public updateOptions(option: any): void {
    this.activeOptionButton = option;
    this.chart.updateOptions(this.updateOptionsData[option], false, true, true);
  }

  date = null;

  onChange(result: Date[]): void {
  }

  getWeek(result: Date[]): void {
  }

}
