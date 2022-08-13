import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../constants.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  vehiclebrands : any = [];

  constructor(private http: HttpClient,private config : Constants) { }

  getvehicleBrand() : Observable<any>{
    return this.http.get(this.config.APIURL+"vehiclebrands");
  }

  getvehicleVariants(brandid : number) : Observable<any>{
    return this.http.get(this.config.APIURL+"vehiclesbybrand/"+brandid);
  }

  postVehicle(data:any) : Observable<any> {
    return this.http.post(this.config.APIURL+"post/create",data);
  }

}
