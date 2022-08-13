import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constants.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient,private config : Constants) { }

  getCities(){
    return this.http.get<any>(this.config.APIURL+"cities");

  }
}
