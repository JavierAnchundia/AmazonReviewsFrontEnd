import { Injectable } from '@angular/core';
import URL_SERVICIOS from '../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  public date_start;
  public date_end;
  public movieCode;
  public userNameList;

  public dateFilterOn = "False";
  public movieCodeFilterOn = "False";
  public userNameFilterOn = "False";
  public mainQueryOn = "True";
  public Top10BestScoreOn = "False";
  public Top10WorstScoreOn = "False";


  private imReviewSubject: BehaviorSubject<any> = new BehaviorSubject({});
  public readonly imReview: Observable<any> = this.imReviewSubject.asObservable();


  private imReviewMaxSubject: BehaviorSubject<any> = new BehaviorSubject({});
  public readonly imReviewMax: Observable<any> = this.imReviewMaxSubject.asObservable();

  
  private imReviewMinSubject: BehaviorSubject<any> = new BehaviorSubject({});
  public readonly imReviewMin: Observable<any> = this.imReviewMinSubject.asObservable();

  
  private imReviewPromSubject: BehaviorSubject<any> = new BehaviorSubject({});
  public readonly imReviewProm: Observable<any> = this.imReviewPromSubject.asObservable();

  
  private imReviewCountSubject: BehaviorSubject<any> = new BehaviorSubject({});
  public readonly imReviewCount: Observable<any> = this.imReviewCountSubject.asObservable();
  
  setReview(imReview: any): void {
    this.imReviewSubject.next(imReview);
  }

  setReviewMax(imReviewMax: any): void {
    this.imReviewMaxSubject.next(imReviewMax);
  }

  setReviewMin(imReviewMin: any): void {
    this.imReviewMinSubject.next(imReviewMin);
  }

  setReviewProm(imReviewProm: any): void {
    this.imReviewPromSubject.next(imReviewProm);
  }

  setReviewCount(imReviewCount: any): void {
    this.imReviewCountSubject.next(imReviewCount);
  }
  

  constructor(private http: HttpClient) 
  {
  
  }

  get_date_start()
  {
    return this.date_start;
  }

  set_date_start(date_start)
  {

    this.date_start = date_start;
  }

  get_date_end()
  {
    return this.date_end;
  }

  set_date_end(date_end)
  {

    this.date_end = date_end;
  }

  get_movieCode()
  {
    return this.movieCode;
  }

  set_movieCode(movieCode)
  {

    this.movieCode = movieCode;
  }

  get_userNameList()
  {
    return this.userNameList;
  }

  set_userNameList(userNameList)
  {

    this.userNameList = userNameList;
  }

  get_dateFilterOn()
  {
    return this.dateFilterOn;
  }

  set_dateFilterOn(dateFilterOn)
  {

    this.dateFilterOn = dateFilterOn;
  }

  get_movieCodeFilterOn()
  {
    return this.movieCodeFilterOn;
  }

  set_movieCodeFilterOn(movieCodeFilterOn)
  {

    this.movieCodeFilterOn = movieCodeFilterOn;
  }

  get_userNameFilterOn()
  {
    return this.userNameFilterOn;
  }

  set_userNameFilterOn(userNameFilterOn)
  {

    this.userNameFilterOn = userNameFilterOn;
  }


  get_mainQueryOn()
  {
    return this.mainQueryOn;
  }

  set_mainQueryOn(mainQueryOn)
  {

    this.mainQueryOn = mainQueryOn;
  }


  get_Top10BestScoreOn()
  {
    return this.Top10BestScoreOn;
  }

  set_Top10BestScoreOn(Top10BestScoreOn)
  {

    this.Top10BestScoreOn = Top10BestScoreOn;
  }

  get_Top10WorstScoreOn()
  {
    return this.Top10WorstScoreOn;
  }

  set_Top10WorstScoreOn(Top10WorstScoreOn)
  {

    this.Top10WorstScoreOn = Top10WorstScoreOn;
  }


   getReviewsData(reviews:FormData):Observable<FormData>{
    let url = URL_SERVICIOS.reviews;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.post<FormData>(url, reviews)
  }
}
