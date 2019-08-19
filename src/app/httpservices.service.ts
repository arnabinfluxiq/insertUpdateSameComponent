import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import{Observable, of,Subject} from 'rxjs';

const httpopt ={
  header:new HttpHeaders({
    'Content-Type':'jsondata'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HttpservicesService {

  subject = new Subject<any>();

  constructor(private http:HttpClient) { }

  private environment: any = 'dev';
  private apiurl:any = 'http://166.62.39.137:5050/';

  postData(url,jsondata):Observable<any>{
    return this.http.post(this.apiurl+url,jsondata);
  }

  clearObj(value:any){
    this.subject.next(value);
  }

  setObj(value:any){
    this.subject.next(null);
  }

 public getObj():Observable<any>{
    return this.subject.asObservable();
  }

}
