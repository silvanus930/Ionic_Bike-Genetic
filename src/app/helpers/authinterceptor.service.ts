import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenserviceService } from '../tokenservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthinterceptorService implements HttpInterceptor {


  urlsToNotUse: Array<string>;

  constructor(private servicetoken : TokenserviceService,private router : Router) {
    this.urlsToNotUse= [
      'admin/login',
      'admin/forgotpass',
      'user/register'
    ];
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authReq = req;

    const token = this.servicetoken.getToken();


    if(this.isValidRequestForInterceptor(req.url)) {

      if(token != ""){
        const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + token
        });

        //authReq = req.clone({ headers: headers });
        authReq = req.clone({ setHeaders: { Authorization : 'Bearer ' + token} });
      }
      return next.handle(authReq);
    }







    return next.handle(authReq);

  }

  private isValidRequestForInterceptor(requestUrl: string): boolean {
    let positionIndicator: string = 'api/v1/';
    let position = requestUrl.indexOf(positionIndicator);
    if (position > 0) {
      let destination: string = requestUrl.substr(position + positionIndicator.length);
      for (let address of this.urlsToNotUse) {
        if (new RegExp(address).test(destination)) {
          return false;
        }
      }
    }
    return true;
  }

}
