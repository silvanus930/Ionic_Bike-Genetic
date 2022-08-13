import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenserviceService {

  constructor() { }

  getToken(): String{
    return window.localStorage.getItem("token") || "";
  }

}
