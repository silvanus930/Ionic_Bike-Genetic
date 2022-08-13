import { Injectable } from '@angular/core';

@Injectable ()
export class Constants {
  LOGINURL:string = "http://43.204.19.133:8080/api/v1/admin/login";
  APIURL: string = "http://43.204.19.133:8080/api/v1/user/";
  FORGOTPASS: string = "http://43.204.19.133:8080/api/v1/admin/";

}
